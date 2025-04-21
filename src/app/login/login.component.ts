import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ToastModule],
  providers:[MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;

  constructor(private router: Router, private messageService: MessageService) {}

  ngOnInit(): void {
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    if (storedEmail && storedPassword) {
      this.email = storedEmail;
      this.password = storedPassword;
      this.rememberMe = true;
    }
  }
  login(): void {
    const validEmail = 'dental@sitin.hr';
    const validPassword = 'dental123';
  
    if (this.email === validEmail && this.password === validPassword) {
      // Show success message
      this.messageService.add({ severity: 'success', summary: 'Uspjeh', detail: 'Uspješno ste prijavljeni.' });
  
      // Store login credentials **before** navigating
      if (this.rememberMe) {
        localStorage.setItem('email', this.email);
        localStorage.setItem('password', this.password);
      } else {
        localStorage.setItem('email', this.email);
        localStorage.setItem('password', this.password);
      }
  
      // Debug: Check that localStorage is updated immediately
      console.log('LocalStorage email:', localStorage.getItem('email'));
      console.log('LocalStorage password:', localStorage.getItem('password'));
  
      // Navigate to /admin
      console.log('Navigating to /admin...');
      this.router.navigate(['admin']).then(success => {
        console.log('Navigation success:', success);  // Should log true if navigation was successful
      });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Pogreška', detail: 'Neispravan email ili lozinka.' });
    }
  }
  
  
}