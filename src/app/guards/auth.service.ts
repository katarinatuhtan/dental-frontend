// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn(): boolean {
    const token = sessionStorage.getItem('token');
    return !!token; // only checks if token exists
  }

  login(email: string, token: string): void {
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('token', token);
  }

  logout(): void {
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('token');
  }
}
