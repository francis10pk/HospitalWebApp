import { Component } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-edit-password',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './edit-password.component.html',
  styleUrl: './edit-password.component.css'
})
export class EditPasswordComponent {
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  message: { text: string; success: boolean } | null = null;
  isPasswordVisible: boolean = false;
  isNewPasswordVisible: boolean = false;

  constructor(private authService: AuthServiceService, private router: Router) {}
  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
  toggleNewPasswordVisibility() {
    this.isNewPasswordVisible = !this.isNewPasswordVisible;
  }

  onUpdatePassword() {
    // Check if the new password and confirmation match
    if (!this.newPassword || !this.confirmPassword) {
      this.message = { text: 'All fields are required.', success: false };
      return;
    }
  
    if (this.newPassword !== this.confirmPassword) {
      this.message = { text: 'New password and confirmation do not match.', success: false };
      return;
    }
  
    // Attempt to login with the current password to validate the user
    this.authService.login(this.currentPassword, this.currentPassword).subscribe(response => {
      if (response.success) {
        // Call the method to reset the password
        this.authService.resetPassword(response.nurse.token, this.newPassword).subscribe(res => {
          this.message = res.message;
          if (res.success) {
            // Optionally navigate away after a successful update
            this.message = { text: res.message || 'Password Saved.', success: true };
          } else {
            // Handle case where password reset fails
            this.message = { text: res.message || 'Failed to reset password.', success: false };
          }
        });
      } else {
        // Handle invalid current password
        this.message = { text: 'Invalid current password.', success: false };
      }
    }, error => {
      // Handle error from the login service
      this.message = { text: 'An error occurred while updating the password.', success: false };
    });
  }
  
}
