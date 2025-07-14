import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../guards/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ToastModule, HttpClientModule],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private http: HttpClient,
    private authService: AuthService

  ) { }

  ngOnInit(): void {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      this.email = storedEmail;
      this.rememberMe = true;
    }
  }

  login(): void {
    this.http.post<any>('https://localhost:44330/api/Auth/login', {
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        this.authService.login(res.email, res.token);

        this.messageService.add({
          severity: 'success',
          summary: 'Uspjeh',
          detail: 'Uspješno ste prijavljeni.'
        });

        setTimeout(() => this.router.navigate(['admin']), 300);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Pogreška',
          detail: 'Neispravan email ili lozinka.'
        });
      }
    });
  }
}