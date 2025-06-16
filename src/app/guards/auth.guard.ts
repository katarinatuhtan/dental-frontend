// src/app/guards/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('authGuard sessionStorage check:', sessionStorage.getItem('email'), sessionStorage.getItem('password'));

  const isLoggedIn = authService.isLoggedIn();
  console.log('authGuard called. Logged in?', isLoggedIn);

  if (isLoggedIn) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
