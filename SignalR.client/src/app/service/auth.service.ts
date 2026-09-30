import { Injectable, signal } from '@angular/core';
import { createClient, User } from '@supabase/supabase-js';
import { supabaseConfig } from '../supabase.config';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly client = createClient(supabaseConfig.url, supabaseConfig.publishableKey);
  readonly user = signal<User | null>(null);
  readonly ready: Promise<void>;
  constructor() {
    this.client.auth.onAuthStateChange((_event, session) => this.user.set(session?.user ?? null));
    this.ready = this.client.auth.getSession().then(({ data }) => {
      this.user.set(data.session?.user ?? null);
    });
  }
  async authenticated(): Promise<boolean> {
    await this.ready;
    const { data, error } = await this.client.auth.getUser();
    this.user.set(error ? null : data.user);
    return !!this.user();
  }
  async signOut(): Promise<void> {
    const { error } = await this.client.auth.signOut();
    if (error) throw error;
  }
}
