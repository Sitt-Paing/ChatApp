import {
  Component,
  effect,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ChatService } from './service/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [ButtonModule, InputTextModule, FormsModule, DatePipe],
})
export class App implements OnInit, OnDestroy {
  // Service ကို inject လုပ်ခြင်း
  protected readonly chatService = inject(ChatService);

  // Message container ကို auto-scroll ပြုလုပ်ရန် reference
  @ViewChild('messageContainer')
  private messageContainer!: ElementRef<HTMLDivElement>;

  // Input box အတွက် signal
  protected readonly inputMessage = signal('');

  constructor() {
    // Message အသစ်ရောက်လာတိုင်း အောက်ဆုံးသို့ အလိုအလျောက် scroll လုပ်ပေးခြင်း
    effect(() => {
      this.chatService.messages(); // Signal change ကို track လုပ်သည်
      setTimeout(() => this.scrollToBottom(), 50);
    });
  }

  async ngOnInit(): Promise<void> {
    await this.chatService.startConnection();
  }

  /**
   * Message ပေးပို့ခြင်း
   */
  async send(): Promise<void> {
    const text = this.inputMessage();
    if (!text.trim()) return;

    try {
      await this.chatService.sendMessage(text);
      this.inputMessage.set(''); // Input box ရှင်းလင်းခြင်း
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  }

  /**
   * Enter ခလုတ်နှိပ်ပါက Message ပေးပို့ခြင်း
   */
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.send();
    }
  }

  /**
   * Message စာရင်း၏ အောက်ဆုံးသို့ scroll ဆင်းခြင်း
   */
  private scrollToBottom(): void {
    if (this.messageContainer) {
      const el = this.messageContainer.nativeElement;
      el.scrollTop = el.scrollHeight;
    }
  }

  async ngOnDestroy(): Promise<void> {
    await this.chatService.stopConnection();
  }
}
