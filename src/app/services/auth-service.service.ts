import { Injectable } from '@angular/core';
import { NURSES } from '../models/data_nurses';
import { Observable, of} from 'rxjs';
import { Nurse } from '../models/nurse';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private loggedInNurse: Nurse | null = null;

  constructor() { }
  setLoggedInNurse(nurse: Nurse) {
    this.loggedInNurse = nurse;
  }

  // Retrieve logged-in nurse
  getLoggedInNurse(): Nurse | null {
    return this.loggedInNurse;
  }
  //login
  login(username: string, password: string): Observable<any> {
    const nurse = NURSES.find(n => n.username === username && n.password === password);
    if (nurse) {
      this.setLoggedInNurse(nurse); // Store logged-in nurse
      return of({ success: true, message: 'Login successful', nurse });
    } else {
      return of({ success: false, message: 'Invalid username or password' });
    }
  }
  

  forgotPassword(email: string): Observable<any> {
    const nurse = NURSES.find(n => n.email === email);
    if (nurse) {
      // In a real app, you'd send an email with a reset link here
      return of({ success: true, message: 'Password reset link sent', token: nurse.token });
    } else {
      return of({ success: false, message: 'Email not found' });
    }
  }

   resetPassword(token: string, newPassword: string): Observable<any> {
    const nurse = NURSES.find(n => n.token === token);
    if (nurse) {
      nurse.password = newPassword; // Update the password
      return of({ success: true, message: 'Password reset successful' });
    } else {
      return of({ success: false, message: 'Invalid or expired token' });
    }
  }
}
