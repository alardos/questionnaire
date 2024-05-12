import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { RouterState, RouterStateSnapshot, provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { AuthGuard } from '../shared/auth.guard';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(BrowserAnimationsModule),
  ]
};
