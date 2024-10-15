import { Component, OnInit, HostListener } from '@angular/core';
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
import { TrackProgressComponent } from '../track-progress/track-progress.component';
import { VitalServiceService } from '../../services/vital-service.service';
import { Patient } from '../../models/patient'

@Component({
  selector: 'app-nurse-dash-board',
  standalone: true,
  imports: [FormsModule, CommonModule, CreateEditPatientComponent, SearchPatientComponent, RecordVitalsComponent, RequestAssistanceComponent, EditPasswordComponent, TrackProgressComponent],
  templateUrl: './nurse-dash-board.component.html',
  styleUrl: './nurse-dash-board.component.css'
})
export class NurseDashboardComponent implements OnInit {
  activeForm: 'create' | 'search/edit' | 'assistance' | 'editpassword' | 'showgraph' | null = null;
  isDropdownVisible: boolean = false;
  selectedPatientId!: number;
  loggedInNurse: Nurse | null = null; 

  constructor(private router: Router, private authService: AuthServiceService,private vitalService: VitalServiceService) {}
  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }
  onOptionSelect() {
    this.isDropdownVisible = false; // Close dropdown when an option is clicked
  }
  ngOnInit() {
    this.loggedInNurse = this.authService.getLoggedInNurse();
  }

  onCreatePatient() {
    this.activeForm = 'create'; 
    this.onOptionSelect();
  }

  onSearchPatients() {
    this.activeForm = 'search/edit'; 
    this.onOptionSelect();
  }

  onAssistance() {
    this.activeForm = 'assistance';
    this.onOptionSelect();
  }

  onEditPassword() {
    this.activeForm = 'editpassword';
    this.onOptionSelect();
  }
  onShowGraph() { // Now it takes a patientId parameter
    this.activeForm = 'showgraph'; // Set active form to show graph
    this.onOptionSelect(); // Close dropdown
  }
  onLogout() {
    this.router.navigate(['']);
  }
  @HostListener('document:click', ['$event'])
  closeDropdown(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.menu-icon')) {
      this.isDropdownVisible = false; // Close dropdown if clicking outside
    }
  }
}
