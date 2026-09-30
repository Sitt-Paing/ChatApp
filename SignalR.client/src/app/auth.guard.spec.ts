import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { Router, UrlTree, provideRouter } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from './service/auth.service';
describe('Protected chat route', () => {
  let authenticated: jasmine.Spy;
  beforeEach(() => {
    authenticated = jasmine.createSpy('authenticated');
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), provideRouter([]), { provide: AuthService, useValue: { authenticated } }]
    });
  });
  it('redirects an unauthenticated user to login', async () => {
    authenticated.and.resolveTo(false);
    const result = await TestBed.runInInjectionContext(() => authGuard({} as never, {} as never));
    expect(result instanceof UrlTree).toBeTrue();
    expect(TestBed.inject(Router).serializeUrl(result as UrlTree)).toBe('/login');
  });
  it('allows a verified signed-in user', async () => {
    authenticated.and.resolveTo(true);
    const result = await TestBed.runInInjectionContext(() => authGuard({} as never, {} as never));
    expect(result).toBeTrue();
  });
});
