import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';


import { routes } from './app.routes';

const ConvoTheme = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#edf7f1', 100: '#d3eddf', 200: '#a9dac2', 300: '#78c2a2',
      400: '#43a785', 500: '#18816b', 600: '#14715e', 700: '#115b4d',
      800: '#104a3f', 900: '#103d35', 950: '#06251f',
    },
  },
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: ConvoTheme,
        options: {
          darkModeSelector: 'none'
        }
      }
    })
  ]
};
