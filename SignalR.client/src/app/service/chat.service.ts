import { inject, Injectable, signal } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState, LogLevel } from '@microsoft/signalr';
import { AuthService } from './auth.service';

export interface Profile { id: string; display_name: string; }
export interface MessageRow { id: string; sender_id: string; recipient_id: string; body: string; created_at: string; }
export interface ChatMessage { id: string; username: string; message: string; timestamp: Date; isMe: boolean; }
export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private readonly auth = inject(AuthService);
  private connection?: HubConnection;
  private generation = 0;
  readonly contacts = signal<Profile[]>([]);
  readonly recipient = signal<Profile | null>(null);
  readonly messages = signal<ChatMessage[]>([]);
  readonly connectionStatus = signal<ConnectionStatus>('disconnected');
  readonly error = signal('');
  readonly sending = signal(false);
  readonly loadingContacts = signal(false);
  readonly loadingHistory = signal(false);
  get currentUserId(): string { return this.auth.user()?.id ?? ''; }

  constructor() {
    this.auth.client.auth.onAuthStateChange((_event, session) => {
      if (!session) void this.stopConnection();
    });
  }

  async startConnection(): Promise<void> {
    if (this.connection?.state === HubConnectionState.Connected ||
        this.connectionStatus() === 'connecting') return;
    const generation = ++this.generation;
    const previous = this.connection;
    this.connection = undefined;
    this.connectionStatus.set('connecting');
    this.error.set('');
    try {
      if (previous) await previous.stop();
      if (!await this.auth.authenticated()) throw new Error('Please sign in again.');
      const user = this.auth.user()!;
      const { data: existing, error: lookupError } = await this.auth.client
        .from('profiles').select('id').eq('id', user.id).maybeSingle();
      if (lookupError) throw lookupError;
      if (!existing) {
        const displayName = String(user.user_metadata['display_name'] || 'Member').trim().slice(0, 60) || 'Member';
        const { error } = await this.auth.client.from('profiles').upsert(
          { id: user.id, display_name: displayName }, { onConflict: 'id', ignoreDuplicates: true });
        if (error) throw error;
      }
      await this.refreshContacts();
      if (generation !== this.generation) return;

      const connection = new HubConnectionBuilder()
        .withUrl('/hub', {
          accessTokenFactory: async () => {
            const { data, error } = await this.auth.client.auth.getSession();
            if (error || !data.session) throw new Error('Please sign in again.');
            return data.session.access_token;
          },
        })
        .withAutomaticReconnect([0, 2000, 5000, 10000, 30000])
        .configureLogging(LogLevel.Warning)
        .build();
      this.connection = connection;
      connection.on('messageReceived', (row: MessageRow) => {
        if (generation !== this.generation) return;
        const peer = this.recipient();
        if (peer && ((row.sender_id === user.id && row.recipient_id === peer.id) ||
          (row.sender_id === peer.id && row.recipient_id === user.id))) this.merge([row]);
      });
      connection.onreconnecting(() => {
        if (generation === this.generation) this.connectionStatus.set('connecting');
      });
      connection.onreconnected(() => {
        if (generation !== this.generation) return;
        this.connectionStatus.set('connected');
        this.error.set('');
        void this.loadHistory().catch(error => this.fail(error, false));
      });
      connection.onclose(() => {
        if (generation !== this.generation) return;
        this.connectionStatus.set('disconnected');
        this.error.set('Connection paused. Reconnect to continue chatting.');
      });
      await connection.start();
      if (generation !== this.generation) { await connection.stop(); return; }
      this.connectionStatus.set('connected');
      await this.loadHistory();
    } catch (error) {
      if (generation === this.generation)
        this.fail(error, this.connection?.state !== HubConnectionState.Connected);
    }
  }

  async refreshContacts(): Promise<void> {
    const generation = this.generation;
    this.loadingContacts.set(true);
    try {
      const { data, error } = await this.auth.client.from('profiles').select('id, display_name')
        .neq('id', this.currentUserId).order('display_name');
      if (generation !== this.generation) return;
      if (error) throw error;
      this.contacts.set(data ?? []);
    } finally { if (generation === this.generation) this.loadingContacts.set(false); }
  }

  async selectRecipient(id: string): Promise<void> {
    this.recipient.set(this.contacts().find(profile => profile.id === id) ?? null);
    this.messages.set([]);
    this.error.set('');
    try { await this.loadHistory(); } catch (error) { this.fail(error, false); }
  }

  private async loadHistory(): Promise<void> {
    const peer = this.recipient();
    const userId = this.currentUserId;
    const generation = this.generation;
    if (!peer || !userId) return;
    this.loadingHistory.set(true);
    try {
      const { data, error } = await this.auth.client.from('messages').select('*')
        .or('and(sender_id.eq.' + userId + ',recipient_id.eq.' + peer.id + '),and(sender_id.eq.' + peer.id + ',recipient_id.eq.' + userId + ')')
        .order('created_at', { ascending: false }).limit(100);
      if (generation !== this.generation || this.recipient()?.id !== peer.id) return;
      if (error) throw error;
      this.merge(data ?? []);
    } finally {
      if (generation === this.generation && this.recipient()?.id === peer.id) this.loadingHistory.set(false);
    }
  }

  private merge(rows: MessageRow[]): void {
    const messages = new Map(this.messages().map(message => [message.id, message]));
    for (const row of rows) messages.set(row.id, {
      id: row.id,
      username: this.contacts().find(profile => profile.id === row.sender_id)?.display_name ?? 'You',
      message: row.body, timestamp: new Date(row.created_at), isMe: row.sender_id === this.currentUserId,
    });
    this.messages.set([...messages.values()]
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime() || a.id.localeCompare(b.id))
      .slice(-100));
  }

  async sendMessage(text: string): Promise<void> {
    const peer = this.recipient();
    const body = text.trim();
    const connection = this.connection;
    if (!peer || !body || body.length > 4000 || this.sending())
      throw new Error('Choose a contact and enter a message of 1–4000 characters.');
    if (!connection || connection.state !== HubConnectionState.Connected)
      throw new Error('Reconnect before sending a message.');
    const generation = this.generation;
    this.sending.set(true);
    this.error.set('');
    try {
      // The hub derives sender identity from the verified token and saves before delivery.
      const row = await connection.invoke<MessageRow>('SendMessage', peer.id, body);
      if (generation === this.generation && this.recipient()?.id === peer.id) this.merge([row]);
    } catch (error) { this.fail(error, false); throw error; }
    finally { this.sending.set(false); }
  }

  private fail(error: unknown, connection = true): void {
    this.error.set(error instanceof Error ? error.message : 'Unable to load messages. Please try again.');
    if (connection) this.connectionStatus.set('error');
  }

  async stopConnection(): Promise<void> {
    ++this.generation;
    const connection = this.connection;
    this.connection = undefined;
    this.messages.set([]);
    this.contacts.set([]);
    this.recipient.set(null);
    this.loadingContacts.set(false);
    this.loadingHistory.set(false);
    this.connectionStatus.set('disconnected');
    if (connection) await connection.stop();
  }
}
