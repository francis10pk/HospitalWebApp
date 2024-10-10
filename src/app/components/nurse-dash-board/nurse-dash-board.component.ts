import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateEditPatientComponent } from "../create-patient/create-edit-patient.component";
import { SearchPatientComponent } from "../search-patient/search-patient.component";
import { RecordVitalsComponent } from "../record-vitals/record-vitals.component";
import { RequestAssistanceComponent } from "../request-assistance/request-assistance.component";
import { EditPasswordComponent } from "../edit-password/edit-password.component";
import { AuthServiceService } from '../../services/auth-service.service'; 
import { Nurse } from '../../models/nurse';

@Component({
  selector: 'app-nurse-dash-board',
  standalone: true,
  imports: [FormsModule, CommonModule, CreateEditPatientComponent, SearchPatientComponent, RecordVitalsComponent, RequestAssistanceComponent, EditPasswordComponent],
  templateUrl: './nurse-dash-board.component.html',
  styleUrl: './nurse-dash-board.component.css'
})
export class NurseDashboardComponent implements OnInit {
  showCreatePatientForm: boolean = false;
  showSearchPatientForm: boolean = false;
  activeForm: 'create' | 'search/edit' | 'assistance' | 'editpassword' | null = null; 

  loggedInNurse: Nurse | null = null; 

  constructor(private router: Router, private authService: AuthServiceService) {}

  ngOnInit() {
    this.loggedInNurse = this.authService.getLoggedInNurse();
  }

  onCreatePatient() {
    this.activeForm = 'create'; 
  }

  onSearchPatients() {
    this.activeForm = 'search/edit'; 
  }

  onAssistance() {
    this.activeForm = 'assistance';
  }

  onEditPassword() {
    this.activeForm = 'editpassword';
  }

  onLogout() {
    this.router.navigate(['']);
  }
}
