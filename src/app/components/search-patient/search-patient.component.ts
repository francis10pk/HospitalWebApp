// import { Component, OnInit } from '@angular/core';
// import { PatientItemListComponent } from '../patient-item-list/patient-item-list.component';
// import { PatientServiceService } from '../../services/patient-service.service';
// import { Router } from '@angular/router';
// import { Patient } from '../../models/patient';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms'

// @Component({
//   selector: 'app-search-patient',
//   standalone: true,
//   imports: [PatientItemListComponent, CommonModule, FormsModule],
//   templateUrl: './search-patient.component.html',
//   styleUrls: ['./search-patient.component.css']
// })
// export class SearchPatientComponent implements OnInit {
//   patients: Patient[] = [];
//   filteredPatients: Patient[] = [];
//   loading: boolean = true; // Loading state
//   errorMessage: string | null = null; // Error message state
//   searchTerm: string = ''; // Search term for filtering

//   constructor(private patientService: PatientServiceService, private router: Router) {}

//   ngOnInit(): void {
//     this.fetchPatients(); // Call the fetchPatients method on component initialization
//   }

//   fetchPatients(): void {
//     this.patientService.getPatients().subscribe(
//       (data: Patient[]) => {
//         this.patients = data; // Store the fetched patients in the patients array
//         this.filteredPatients = data; // Initialize filtered patients
//         this.loading = false; // Set loading to false
//       },
//       (error) => {
//         console.error('Error fetching patients:', error); // Handle errors if any
//         this.errorMessage = 'Failed to load patients. Please try again.'; // Set error message
//         this.loading = false; // Set loading to false even on error
//       }
//     );
//   }

//   // Method to filter patients based on search term
//   filterPatients(): void {
//     this.filteredPatients = this.patients.filter(patient => 
//       patient.name.toLowerCase().includes(this.searchTerm.toLowerCase())
//     );
//   }
// }
import { Component, OnInit } from '@angular/core';
import { PatientServiceService } from '../../services/patient-service.service';
import { Patient } from '../../models/patient';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PatientItemListComponent } from '../patient-item-list/patient-item-list.component';
import { PATIENTS } from '../../models/data_patient'; // Ensure the import path is correct

@Component({
  selector: 'app-search-patient',
  standalone: true,
  imports: [PatientItemListComponent, CommonModule, FormsModule],
  templateUrl: './search-patient.component.html',
  styleUrls: ['./search-patient.component.css']
})
export class SearchPatientComponent implements OnInit {
  patients: Patient[] = PATIENTS; // Use the initialized data
  filteredPatients: Patient[] = [];
  selectedPatient: Patient | null = null; // For editing a selected patient
  isEditing: boolean = false; // To toggle between viewing and editing
  searchTerm: string = ''; // Search term for filtering
  searchBy: string = 'name'; // To toggle between searching by name or ID

  constructor(private patientService: PatientServiceService) {}

  ngOnInit(): void {
    // Initialize filtered patients from the PATIENTS data
    this.filteredPatients = this.patients;
  }

  // Method to filter patients based on search term and criteria (name or id)
  filterPatients(): void {
    if (this.searchBy === 'name') {
      this.filteredPatients = this.patients.filter(patient =>
        patient.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else if (this.searchBy === 'id') {
      this.filteredPatients = this.patients.filter(patient =>
        patient.id.toString().includes(this.searchTerm)
      );
    }
  }

 // Select patient for viewing/editing
selectPatient(patient: Patient): void {
  this.selectedPatient = { ...patient }; // Clone the selected patient for viewing
  this.isEditing = false; // Set editing mode off
}

// View details of the patient
viewDetails(id: number): void {
  const patient = this.patients.find(p => p.id === id);
  if (patient) {
      this.selectedPatient = { ...patient }; // Set the selected patient
      this.isEditing = false; // Ensure editing mode is off for viewing
  }
}

// Toggle editing mode
editPatient(patient: Patient): void {
  this.selectedPatient = { ...patient }; // Clone the selected patient for editing
  this.isEditing = true; // Set editing mode on
}


  // Method to update the patient details
  updatePatient(): void {
    if (this.selectedPatient) {
      this.patientService.updatePatient(this.selectedPatient).subscribe(
        (updatedPatient: Patient) => {
          // Update the patient in the patients array
          const index = this.patients.findIndex(p => p.id === updatedPatient.id);
          if (index !== -1) {
            this.patients[index] = updatedPatient;
            this.filteredPatients = [...this.patients]; // Refresh the filtered list
          }
          this.isEditing = false; // Set editing mode off
          this.selectedPatient = null; // Clear the selected patient after saving
        },
        (error) => {
          console.error('Error updating patient:', error);
        }
      );
    }
  }
}
