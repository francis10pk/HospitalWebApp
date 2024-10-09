import { Component, OnInit } from '@angular/core';
import { PatientItemListComponent } from '../patient-item-list/patient-item-list.component';
import { PatientServiceService } from '../../services/patient-service.service';
import { Router } from '@angular/router';
import { Patient } from '../../models/patient';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-search-patient',
  standalone: true,
  imports: [PatientItemListComponent, CommonModule, FormsModule],
  templateUrl: './search-patient.component.html',
  styleUrls: ['./search-patient.component.css']
})
export class SearchPatientComponent implements OnInit {
  patients: Patient[] = [];
  filteredPatients: Patient[] = [];
  loading: boolean = true; // Loading state
  errorMessage: string | null = null; // Error message state
  searchTerm: string = ''; // Search term for filtering

  constructor(private patientService: PatientServiceService, private router: Router) {}

  ngOnInit(): void {
    this.fetchPatients(); // Call the fetchPatients method on component initialization
  }

  fetchPatients(): void {
    this.patientService.getPatients().subscribe(
      (data: Patient[]) => {
        this.patients = data; // Store the fetched patients in the patients array
        this.filteredPatients = data; // Initialize filtered patients
        this.loading = false; // Set loading to false
      },
      (error) => {
        console.error('Error fetching patients:', error); // Handle errors if any
        this.errorMessage = 'Failed to load patients. Please try again.'; // Set error message
        this.loading = false; // Set loading to false even on error
      }
    );
  }

  // Method to filter patients based on search term
  filterPatients(): void {
    this.filteredPatients = this.patients.filter(patient => 
      patient.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
