import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {provideHttpClient, withInterceptors } from '@angular/common/http';
import { customInterceptor } from './interceptors/custom.interceptor';
import { provideNativeDateAdapter } from '@angular/material/core';
export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withInterceptors([customInterceptor])),provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimationsAsync(),provideNativeDateAdapter()]
};
