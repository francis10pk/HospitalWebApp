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
    // Ensure all fields are filled
    if (!this.currentPassword || !this.newPassword || !this.confirmPassword) {
      this.message = { text: 'All fields are required.', success: false };
      return;
    }
  
    // Check if the new password and confirmation match
    if (this.newPassword !== this.confirmPassword) {
      this.message = { text: 'New password and confirmation do not match.', success: false };
      return;
    }
  
    // Get the logged-in nurse's username
    const loggedInNurse = this.authService.getLoggedInNurse();
    if (!loggedInNurse) {
      this.message = { text: 'No nurse is currently logged in.', success: false };
      return;
    }
  
    // Validate the current password by logging in
    this.authService.login(loggedInNurse.username, this.currentPassword).subscribe(response => {
      if (response.success) {
        // If login is successful, reset the password using the nurse's token
        this.authService.resetPassword(response.nurse.token, this.newPassword).subscribe(res => {
          if (res.success) {
            this.message = { text: 'Password updated successfully.', success: true };
            // Optionally navigate away after a successful update
            this.router.navigate(['/dashboard']);
          } else {
            this.message = { text: 'Failed to update password.', success: false };
          }
        });
      } else {
        this.message = { text: 'Invalid current password.', success: false };
      }
    }, error => {
      this.message = { text: 'An error occurred while updating the password.', success: false };
    });
  }
  
  
  
}
