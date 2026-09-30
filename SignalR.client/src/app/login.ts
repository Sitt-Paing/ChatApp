import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ButtonModule, InputTextModule, PasswordModule, MessageModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  readonly registering = signal(false);
  readonly busy = signal(false);
  readonly notice = signal('');
  readonly noticeSeverity = signal<'error' | 'success'>('error');
  email = '';
  password = '';
  name = '';

  toggleMode(): void {
    this.registering.update(value => !value);
    this.notice.set('');
    this.password = '';
  }

  async submit(form: NgForm): Promise<void> {
    if (this.busy()) return;
    if (form.invalid || (this.registering() && !this.name.trim())) {
      form.control.markAllAsTouched();
      this.noticeSeverity.set('error');
      this.notice.set('Please enter a valid email, password' + (this.registering() ? ', and display name.' : '.'));
      return;
    }
    this.busy.set(true);
    this.notice.set('');
    try {
      const result = this.registering()
        ? await this.auth.client.auth.signUp({
            email: this.email.trim(), password: this.password,
            options: {
              data: { display_name: this.name.trim() },
              emailRedirectTo: window.location.origin + '/chat',
            },
          })
        : await this.auth.client.auth.signInWithPassword({ email: this.email.trim(), password: this.password });
      if (result.error) throw result.error;
      if (result.data.session) await this.router.navigateByUrl('/chat');
      else {
        this.noticeSeverity.set('success');
        this.notice.set('Check your email to confirm your account, then come back and sign in.');
      }
    } catch (error) {
      this.noticeSeverity.set('error');
      this.notice.set(error instanceof Error ? error.message : 'Unable to sign in. Try again.');
    } finally { this.busy.set(false); }
  }
}
