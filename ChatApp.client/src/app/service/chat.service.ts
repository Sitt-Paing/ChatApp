import { inject, Injectable, signal } from '@angular/core';
import { RealtimeChannel } from '@supabase/supabase-js';
import { AuthService } from './auth.service';

export interface Profile { id: string; display_name: string; }
export interface MessageRow { id: string; sender_id: string; recipient_id: string; body: string; created_at: string; }
export interface ChatMessage { id: string; username: string; message: string; timestamp: Date; isMe: boolean; }
export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private readonly auth = inject(AuthService);
  private channels: RealtimeChannel[] = [];
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
    if (this.connectionStatus() === 'connected' || this.connectionStatus() === 'connecting') return;
    const generation = ++this.generation;
    this.connectionStatus.set('connecting');
    this.error.set('');
    try {
      await this.removeChannels();
      if (!await this.auth.authenticated()) throw new Error('Please sign in again.');
      const user = this.auth.user();
      if (!user) throw new Error('Please sign in again.');

      const { data: sessionData, error: sessionError } = await this.auth.client.auth.getSession();
      if (sessionError) throw sessionError;
      if (!sessionData.session) throw new Error('Please sign in again.');
      this.auth.client.realtime.setAuth(sessionData.session.access_token);

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

      const channel = this.auth.client.channel(`messages:${user.id}`)
        .on('postgres_changes', {
          event: 'INSERT', schema: 'public', table: 'messages', filter: `recipient_id=eq.${user.id}`,
        }, payload => this.receiveMessage(payload.new as MessageRow, generation, user.id))
        .on('postgres_changes', {
          event: 'INSERT', schema: 'public', table: 'messages', filter: `sender_id=eq.${user.id}`,
        }, payload => this.receiveMessage(payload.new as MessageRow, generation, user.id));
      this.channels.push(channel);

      await new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error('Realtime connection timed out. Please reconnect.')), 15_000);
        channel.subscribe((status, error) => {
          if (status === 'SUBSCRIBED') {
            clearTimeout(timeout);
            if (generation === this.generation) {
              this.connectionStatus.set('connected');
              this.error.set('');
            }
            resolve();
          } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT' || status === 'CLOSED') {
            clearTimeout(timeout);
            const failure = error ?? new Error(`Realtime subscription ${status.toLowerCase()}.`);
            if (generation === this.generation) {
              this.connectionStatus.set('error');
              this.error.set(failure instanceof Error ? failure.message : 'Realtime connection lost. Please reconnect.');
            }
            reject(failure);
          }
        });
      });
      if (generation !== this.generation) return;
      await this.loadHistory();
    } catch (error) {
      if (generation === this.generation) {
        await this.removeChannels();
        this.fail(error);
      }
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

  private receiveMessage(row: MessageRow, generation: number, userId: string): void {
    if (generation !== this.generation) return;
    const peer = this.recipient();
    if (peer && ((row.sender_id === userId && row.recipient_id === peer.id) ||
      (row.sender_id === peer.id && row.recipient_id === userId))) this.merge([row]);
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
    const senderId = this.currentUserId;
    if (!peer || !body || body.length > 4000 || this.sending())
      throw new Error('Choose a contact and enter a message of 1–4000 characters.');
    if (this.connectionStatus() !== 'connected') throw new Error('Reconnect before sending a message.');
    const generation = this.generation;
    this.sending.set(true);
    this.error.set('');
    try {
      const { data, error } = await this.auth.client.from('messages')
        .insert({ sender_id: senderId, recipient_id: peer.id, body })
        .select('id, sender_id, recipient_id, body, created_at').single();
      if (error) throw error;
      if (generation === this.generation && this.recipient()?.id === peer.id) this.merge([data]);
    } catch (error) { this.fail(error, false); throw error; }
    finally { this.sending.set(false); }
  }

  private fail(error: unknown, connection = true): void {
    this.error.set(error instanceof Error ? error.message : 'Unable to load messages. Please try again.');
    if (connection) this.connectionStatus.set('error');
  }

  private async removeChannels(): Promise<void> {
    const channels = this.channels;
    this.channels = [];
    await Promise.all(channels.map(channel => this.auth.client.removeChannel(channel)));
  }

  async stopConnection(): Promise<void> {
    ++this.generation;
    await this.removeChannels();
    this.messages.set([]);
    this.contacts.set([]);
    this.recipient.set(null);
    this.loadingContacts.set(false);
    this.loadingHistory.set(false);
    this.connectionStatus.set('disconnected');
  }
}
