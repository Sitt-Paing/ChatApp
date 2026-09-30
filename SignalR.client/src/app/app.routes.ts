import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./login').then(m => m.Login) },
  { path: 'chat', canActivate: [authGuard], loadComponent: () => import('./chat').then(m => m.Chat) },
  { path: '', pathMatch: 'full', redirectTo: 'chat' },
  { path: '**', redirectTo: 'chat' },
];
