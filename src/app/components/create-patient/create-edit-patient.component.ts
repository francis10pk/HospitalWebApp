import { Component, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'; 
import { Patient, Vitals } from '../../models/patient';
import { PatientServiceService } from '../../services/patient-service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-edit-patient',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-edit-patient.component.html',
  styleUrls: ['./create-edit-patient.component.css'] 
})
export class CreateEditPatientComponent implements OnInit {
  @ViewChild('createPatientForm') createPatientForm!: NgForm;
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
    // Ensure all properties are defined before creating a patient
    if (this.isPatientValid(this.patient)) {
      this.patientService.createPatient(this.patient);

    } else {
      console.error("Patient data is invalid");
    }
  }
  private isPatientValid(patient: Patient): boolean {
    return (
      typeof patient.id === 'number' &&
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
