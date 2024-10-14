import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nurse-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './nurse-login.component.html',
  styleUrls: ['./nurse-login.component.css']
})
export class NurseLoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  rememberMe: boolean = false; // Added for "Remember Me"
  message: { text: string; success: boolean } | null = null;
  showPassword: boolean = false;

  constructor(private authService: AuthServiceService, private router: Router) {}

  onLogin() {
    if (!this.username || !this.password) {
      this.message = { text: 'Please enter both username and password.', success: false };
      return;
    }


    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        this.message = { text: response.message, success: response.success 
        };
        if (response.success) {
          if (this.rememberMe) {
            // Store username in localStorage if "Remember Me" is checked
            localStorage.setItem('rememberMe', this.username);
          } else {
            localStorage.removeItem('rememberMe');
          }
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err) => {
        this.message = { text: 'Login failed. Please try again.', success: false };
        console.error('Login error:', err);
      }
    });
  }
  onForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword; // Toggles password visibility
  }
  ngOnInit(): void {
    this.username = '';
    this.password = '';
    this.message = null;
    const savedUsername = localStorage.getItem('rememberMe');
    if (savedUsername) {
      this.username = savedUsername;
      this.rememberMe = true;
    }
  }
}
