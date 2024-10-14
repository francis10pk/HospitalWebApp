import { Component } from '@angular/core';
import { AssistanceServiceService } from '../../services/assistance-service.service';
import { PatientServiceService } from '../../services/patient-service.service'; // Import the Patient Service
import { CommonModule } from '@angular/common';
import { Patient } from '../../models/patient'; // Import the Patient model
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
@Component({
  selector: 'app-request-assistance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './request-assistance.component.html',
  styleUrl: './request-assistance.component.css'
})
export class RequestAssistanceComponent {
  customerId: string = ''; // For holding customer ID input
  patient: Patient | null = null; // Placeholder for fetched patient data
  patientLoaded: boolean = false; // Flag for when patient data is loaded
  message: string = '';
  needsAssistance: boolean = false;
   // New properties for the appointment and assistance selection
 
   appointmentDateTime: string = '';
   selectedDoctor: string = '';
   assistanceMethod: string = '';
   icuNotes: string = ''; // Declare the icuNotes property
   // Sample doctor data
   doctors = [
     { name: 'Dr. John Smith', department: 'Cardiology' },
     { name: 'Dr. Jane Doe', department: 'Neurology' },
     { name: 'Dr. Richard Roe', department: 'General Medicine' }
   ];
   constructor(
     private assistanceService: AssistanceServiceService,
     private patientService: PatientServiceService // Inject the PatientService
   ) {}
   // Method to load patient data based on Customer ID
   loadPatientData(): void {
     this.patientService.getPatients().subscribe((patients) => {
       // Find patient by customerId
       const foundPatient = patients.find((patient) => patient.id.toString() === this.customerId);
       
       if (foundPatient) {
         this.patient = foundPatient;
         this.patientLoaded = true; // Set the flag that patient data is loaded
       } else {
         this.message = 'No patient found with this Customer ID.';
         this.patientLoaded = false;
       }
     });
   }
   // Handle assistance method selection changes
   onAssistanceMethodChange(): void {
     // Clear the message initially
     this.message = '';
     // Logic for handling changes based on the selected assistance method
     if (this.assistanceMethod === 'ambulance') {
         this.message = 'Call Ambulance: +1 800 123 4567';
     } else if (this.assistanceMethod === 'doctor') {
         if (this.selectedDoctor) {
             const doctor = this.doctors.find(d => d.name === this.selectedDoctor);
             if (doctor) {
                 this.message = `Call ${doctor.name} (${doctor.department}) at +1-800-765-4321.`;
             }
         } else {
             this.message = 'Please select a doctor.';
         }
     } else if (this.assistanceMethod === 'icu') {
         this.message = 'ICU booking available. Availability: 5 Beds.';
     }
 }
   // Method to handle Request Assistance button click
   onRequestAssistance(): void {
     if (!this.patient) {
       this.message = 'No patient data available.';
       this.needsAssistance = false;
       return;
     }
   
     const assistanceRequired = this.assistanceService.checkAssistanceNeeded(this.patient.vitals);
     if (assistanceRequired) {
       this.message = 'Assistance Requested! Patient needs urgent care.';
       this.needsAssistance = true;
     } else {
       this.message = 'Patient health is stable. No assistance needed at this time.';
       this.needsAssistance = false;
     }
   }
   // Method to handle form submission
   onSubmit(): void {
     if (this.assistanceMethod === 'ambulance') {
       this.message = 'Ambulance has been called. Please wait for assistance.';
     } else if (this.assistanceMethod === 'doctor') {
       this.message = 'Doctor has been contacted. You will receive a call shortly.';
     } else if (this.assistanceMethod === 'icu') {
       this.message = 'ICU booking confirmed. Details have been sent to the hospital.';
     } else {
       this.message = 'No assistance method selected.';
     }
   }
}
