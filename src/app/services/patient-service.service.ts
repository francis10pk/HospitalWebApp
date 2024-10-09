import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Patient } from '../models/patient';
import { PATIENTS } from '../models/data_patient'; // Adjust the import path as needed

@Injectable({
  providedIn: 'root'
})
export class PatientServiceService {
  patients: Patient[] = PATIENTS; 

  constructor() { }

  createPatient(patient: Patient): Observable<any> {
    // Assign a new ID
    patient.id = this.patients.length ? Math.max(...this.patients.map(p => p.id)) + 1 : 0;
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

  getPatients(): Observable<Patient[]> {
    return of(this.patients);
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
}
