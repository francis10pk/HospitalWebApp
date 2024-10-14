import { Component, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'; 
import { Patient, Vitals } from '../../models/patient';
import { PatientServiceService } from '../../services/patient-service.service';

@Component({
  selector: 'app-create-edit-patient',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-edit-patient.component.html',
  styleUrls: ['./create-edit-patient.component.css'] 
})
export class CreateEditPatientComponent implements OnInit {
  @ViewChild('createPatientForm') createPatientForm!: NgForm;

  // Initialize the patient with default values
  patient: Patient = {
    id: 0,
    name: '',
    age: 0, 
    gender: '',
    vitals: {
      weight: 0,
      height: 0,
      bloodPressure: '',
      sugarLevel: 0,
      heartRate: 0
    },
    ongoingMedications: '',
    allergies: '',
    critical: false
  };
  
  message: string = '';

  constructor(
    private patientService: PatientServiceService,
    private router: Router,
    private route: ActivatedRoute 
  ) {}

  ngOnInit(): void {
    // Check if we are editing an existing patient
    const patientId = this.route.snapshot.paramMap.get('id');
    if (patientId) {
      this.loadPatient(+patientId); // Load patient data if editing
    }
  }

  loadPatient(id: number): void {
    this.patientService.getPatients().subscribe((patients) => {
      const foundPatient = patients.find(p => p.id === id);
      if (foundPatient) {
        this.patient = { ...foundPatient }; // Populate the patient data for editing
      } else {
        this.message = 'Patient not found.';
      }
    });
  }

  onCreatePatient(): void {
    // Use Angular's form validation before submission
    if (this.createPatientForm.valid && this.isPatientValid(this.patient)) {
      this.patientService.createPatient(this.patient).subscribe(() => {
        this.message = 'Patient created successfully!';
        this.resetPatientData();
        
      }, error => {
        console.error("Error creating patient", error);
        this.message = 'Failed to create patient. Please try again.';
      });
    } else {
      console.error("Patient data is invalid");
      this.message = 'Please fill out all fields correctly.';
    }
  }

  // Reset patient object to default values
  resetPatientData(): void {
    this.patient = {
      id: 0,
      name: '',
      age: 0,
      gender: '',
      vitals: {
        weight: 0,
        height: 0,
        bloodPressure: '',
        sugarLevel: 0,
        heartRate: 0
      },
      ongoingMedications: '',
      allergies: '',
      critical: false
    };
  }

  // Validate patient object
  private isPatientValid(patient: Patient): boolean {
    return (
      typeof patient.name === 'string' &&
      typeof patient.age === 'number' && patient.age > 0 &&
      typeof patient.gender === 'string' &&
      this.isVitalsValid(patient.vitals) &&
      typeof patient.ongoingMedications === 'string' &&
      typeof patient.allergies === 'string' &&
      typeof patient.critical === 'boolean'
    );
  }

  private isVitalsValid(vitals: Vitals): boolean {
    return (
      typeof vitals.weight === 'number' && vitals.weight > 0 &&
      typeof vitals.height === 'number' && vitals.height > 0 &&
      typeof vitals.bloodPressure === 'string' &&
      typeof vitals.sugarLevel === 'number' && vitals.sugarLevel > 0 &&
      typeof vitals.heartRate === 'number' && vitals.heartRate > 0
    );
  }
}
