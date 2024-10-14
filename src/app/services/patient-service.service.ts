import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Patient } from '../models/patient';
import { PATIENTS } from '../models/data_patient'; 

@Injectable({
  providedIn: 'root'
})
export class PatientServiceService {
  patients: Patient[] = PATIENTS; 

  constructor() { }

  lastId: number = Math.max(...PATIENTS.map(p => p.id), 0);

  createPatient(patient: Patient): Observable<any> {
  // Assign a new ID by incrementing the last used ID
  this.lastId += 1;
  patient.id = this.lastId;
  this.patients.push(patient);
  return of({ success: true, message: 'Patient created successfully!' });
}

  updatePatient(updatedPatient: Patient): Observable<Patient> {
    // Find index of the patient to update
    const index = this.patients.findIndex(patient => patient.id === updatedPatient.id);
    
    if (index !== -1) {
      // Update the patient if found
      this.patients[index] = updatedPatient;
      return of(updatedPatient); // Return the updated patient
    } else {
      // Handle patient not found case
      return throwError(new Error('Patient not found')); // Throw an error if not found
    }
  }

  deletePatient(id: number): Observable<any> {
    const index = this.patients.findIndex(patient => patient.id === id);
    
    if (index !== -1) {
      this.patients.splice(index, 1); // Remove the patient from the array
      return of({ success: true, message: 'Patient deleted successfully!' });
    } else {
      return throwError(new Error('Patient not found')); // Throw an error if not found
    }
  }
  getPatients(): Observable<Patient[]> {
    const patientsFromStorage = localStorage.getItem('patients');
    this.patients = patientsFromStorage ? JSON.parse(patientsFromStorage) : PATIENTS; // Use default if no data
    return of(this.patients);
  }
}
