import {
  afterNextRender, Component, computed, effect, ElementRef, inject,
  Injector, OnDestroy, OnInit, signal, ViewChild,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { TagModule } from 'primeng/tag';
import { MessageModule } from 'primeng/message';
import { SkeletonModule } from 'primeng/skeleton';
import { ChatMessage, ChatService } from './service/chat.service';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.html',
  host: { class: 'block' },
  imports: [AvatarModule, ButtonModule, InputTextModule, TextareaModule, TagModule, MessageModule, SkeletonModule, FormsModule, DatePipe, RouterLink],
})
export class Chat implements OnInit, OnDestroy {
  protected readonly chatService = inject(ChatService);
  protected readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly injector = inject(Injector);
  @ViewChild('messageContainer') private messageContainer?: ElementRef<HTMLDivElement>;
  protected readonly inputMessage = signal('');
  protected readonly search = signal('');
  protected readonly loggingOut = signal(false);
  protected readonly filteredContacts = computed(() => {
    const query = this.search().trim().toLocaleLowerCase();
    return this.chatService.contacts().filter(contact =>
      contact.display_name.toLocaleLowerCase().includes(query) || contact.id.includes(query));
  });
  protected readonly displayName = computed(() =>
    String(this.auth.user()?.user_metadata['display_name'] || 'Member'));
  protected readonly statusLabel = computed(() => {
    const status = this.chatService.connectionStatus();
    return status === 'connected' ? 'Live' : status === 'connecting' ? 'Connecting' : 'Offline';
  });
  protected readonly statusSeverity = computed(() =>
    this.chatService.connectionStatus() === 'connected' ? 'success' as const : 'warn' as const);

  constructor() {
    effect(() => {
      if (!this.auth.user()) void this.router.navigateByUrl('/login');
    });
    effect(() => {
      this.chatService.messages();
      afterNextRender(() => {
        const element = this.messageContainer?.nativeElement;
        if (element) element.scrollTop = element.scrollHeight;
      }, { injector: this.injector });
    });
  }

  async ngOnInit(): Promise<void> { await this.chatService.startConnection(); }
  async refreshContacts(): Promise<void> {
    try { await this.chatService.refreshContacts(); }
    catch (error) { this.chatService.error.set(error instanceof Error ? error.message : 'Unable to refresh contacts.'); }
  }
  async logout(): Promise<void> {
    this.loggingOut.set(true);
    try {
      await this.auth.signOut();
      await this.chatService.stopConnection();
      await this.router.navigateByUrl('/login');
    } catch (error) {
      this.chatService.error.set(error instanceof Error ? error.message : 'Sign out failed.');
    } finally { this.loggingOut.set(false); }
  }
  async selectContact(id: string): Promise<void> {
    if (this.chatService.sending()) return;
    this.inputMessage.set('');
    await this.chatService.selectRecipient(id);
  }
  async send(): Promise<void> {
    const text = this.inputMessage();
    if (!text.trim() || this.chatService.sending()) return;
    try {
      await this.chatService.sendMessage(text);
      if (this.inputMessage() === text) this.inputMessage.set('');
    } catch { /* ChatService displays the error; keep the draft for retry. */ }
  }
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) {
      event.preventDefault();
      void this.send();
    }
  }
  initials(name: string): string {
    return name.trim().split(/\s+/).slice(0, 2).map(part => Array.from(part)[0] ?? '').join('').toLocaleUpperCase();
  }
  startsDay(index: number, message: ChatMessage): boolean {
    const previous = this.chatService.messages()[index - 1];
    return !previous || previous.timestamp.toDateString() !== message.timestamp.toDateString();
  }
  async ngOnDestroy(): Promise<void> { await this.chatService.stopConnection(); }
}
