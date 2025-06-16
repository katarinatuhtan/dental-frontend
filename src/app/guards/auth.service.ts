// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn(): boolean {
    const email = sessionStorage.getItem('email');
    const password = sessionStorage.getItem('password');

    console.log('AuthService isLoggedIn check:', email, password);

    return email !== null && password !== null;
  }

  login(email: string, password: string): void {
    // In a real app, you'd verify these credentials via API
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('password', password);
  }

  logout(): void {
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('password');
    sessionStorage.removeItem('loginTime');
  }
}
