import { Component } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  email: string = '';
  message: string = '';

  constructor(private authService: AuthServiceService,private router: Router) {}

  onForgotPassword() {
    this.authService.forgotPassword(this.email).subscribe(response => {
      this.message = response.message; 
    });
  }
  onGoBack() {
    this.router.navigate(['/nurse-login']); // Navigates back to the login page
  }
}
