import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn(): boolean {
    // Check both sessionStorage and localStorage
    const email = sessionStorage.getItem('email') || localStorage.getItem('email');
    const password = sessionStorage.getItem('password') || localStorage.getItem('password');

    console.log('AuthService isLoggedIn check:', email, password);

    // Return true if email and password exist in sessionStorage or localStorage
    return email !== null && password !== null;
  }

  logout(): void {
    // Clear login data from localStorage and sessionStorage
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('password');

    // Optionally, clear any other session-related data
    localStorage.removeItem('loginTime');
  }
}
