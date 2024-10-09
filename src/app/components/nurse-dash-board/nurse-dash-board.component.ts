import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateEditPatientComponent } from "../create-patient/create-edit-patient.component";
import { SearchPatientComponent } from "../search-patient/search-patient.component";
import { RecordVitalsComponent } from "../record-vitals/record-vitals.component";
import { RequestAssistanceComponent } from "../request-assistance/request-assistance.component";
import { EditPasswordComponent } from "../edit-password/edit-password.component";


@Component({
  selector: 'app-nurse-dash-board',
  standalone: true,
  imports: [FormsModule, CommonModule, CreateEditPatientComponent, SearchPatientComponent, RecordVitalsComponent, RequestAssistanceComponent, EditPasswordComponent],
  templateUrl: './nurse-dash-board.component.html',
  styleUrl: './nurse-dash-board.component.css'
})

export class NurseDashboardComponent {
  showCreatePatientForm: boolean = false;
  showSearchPatientForm: boolean = false;
  activeForm: 'create' | 'search/edit' | 'assistance' | 'editpassword' | null = null; 

  constructor(private router: Router) {}

  onCreatePatient() {
    this.activeForm = 'create'; // Set active form to create
  }

  onSearchPatients() {
    this.activeForm = 'search/edit'; // Set active form to search
  }

  onAssistance() {
    this.activeForm = 'assistance';
  }

  onEditPassword() {
    this.activeForm = 'editpassword';
  }


  onLogout() {
    this.router.navigate(['/login']);
  }
}
