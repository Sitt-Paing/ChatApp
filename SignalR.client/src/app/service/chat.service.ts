import { Injectable, signal } from '@angular/core';
import * as signalR from '@microsoft/signalr';

export interface ChatMessage {
  username: number;
  message: string;
  timestamp: Date;
  isMe: boolean;
}

export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private hubConnection?: signalR.HubConnection;

  // လက်ရှိ user အတွက် unique ID (Backend ChatHub ရဲ့ long username နဲ့ ကိုက်ညီစေရန်)
  readonly currentUserId: number = Date.now();

  // Angular Signals ဖြင့် reactive state စီမံခြင်း
  readonly messages = signal<ChatMessage[]>([]);
  readonly connectionStatus = signal<ConnectionStatus>('disconnected');

  constructor() {
    this.initHubConnection();
  }

  /**
   * SignalR Hub Connection ကို စတင်တည်ဆောက်ခြင်း
   */
  private initHubConnection(): void {
    // Angular dev server (port 4200) မှ run ပါက backend port 5180 သို့ ချိတ်ဆက်မည်
    const hubUrl =
      window.location.port === '4200' ? 'http://localhost:5180/hub' : '/hub';

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl, {
        transport: signalR.HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect([0, 2000, 5000, 10000]) // အလိုအလျောက် ပြန်လည်ချိတ်ဆက်မှု
      .configureLogging(signalR.LogLevel.Information)
      .build();

    // Server မှ ပေးပို့လာသော message ကို ဖမ်းယူခြင်း
    this.hubConnection.on('messageReceived', (username: number, message: string) => {
      const incomingMessage: ChatMessage = {
        username,
        message,
        timestamp: new Date(),
        isMe: username === this.currentUserId,
      };

      // messages signal ထဲသို့ message အသစ်ပေါင်းထည့်ခြင်း
      this.messages.update((prev) => [...prev, incomingMessage]);
    });

    // Connection lifecycle ဖြစ်ရပ်များကို စောင့်ကြည့်ခြင်း
    this.hubConnection.onreconnecting(() => this.connectionStatus.set('connecting'));
    this.hubConnection.onreconnected(() => this.connectionStatus.set('connected'));
    this.hubConnection.onclose(() => this.connectionStatus.set('disconnected'));
  }

  /**
   * Hub နှင့် စတင် ချိတ်ဆက်ခြင်း
   */
  async startConnection(): Promise<void> {
    if (!this.hubConnection || this.hubConnection.state === signalR.HubConnectionState.Connected) {
      return;
    }

    try {
      this.connectionStatus.set('connecting');
      await this.hubConnection.start();
      this.connectionStatus.set('connected');
    } catch (error) {
      this.connectionStatus.set('error');
      console.error('SignalR Connection Error:', error);
    }
  }

  /**
   * Hub သို့ စာတို (Message) ပေးပို့ခြင်း
   */
  async sendMessage(messageText: string): Promise<void> {
    const trimmed = messageText.trim();
    if (!trimmed || !this.hubConnection || this.hubConnection.state !== signalR.HubConnectionState.Connected) {
      return;
    }

    // Backend ChatHub.cs ရဲ့ NewMessage(long username, string message) ကို invoke လုပ်ခြင်း
    await this.hubConnection.invoke('NewMessage', this.currentUserId, trimmed);
  }

  /**
   * Connection ကို ရပ်တန့်ခြင်း
   */
  async stopConnection(): Promise<void> {
    if (this.hubConnection) {
      await this.hubConnection.stop();
      this.connectionStatus.set('disconnected');
    }
  }
}
