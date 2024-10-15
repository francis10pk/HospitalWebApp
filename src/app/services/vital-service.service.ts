import { Injectable } from '@angular/core';
import { Patient} from '../models/patient'; // Ensure this import is correct
import{PATIENTS} from '../models/data_patient'
@Injectable({
  providedIn: 'root'
})
export class VitalServiceService {

  constructor() { }
  getPatientById(id: number): Patient | undefined {
    console.log('Fetching patient with ID:', id);
    // Check if PATIENTS array is defined and not empty
    if (!PATIENTS || PATIENTS.length === 0) {
      console.error('No patients available');
      return undefined;
    }
    // Log the patient ID being searched
    console.log('Searching for patient with ID:', id);
    // Find and return the patient by ID
    const foundPatient = PATIENTS.find(patient => patient.id === id);
    if (!foundPatient) {
      console.warn(`Patient with ID: ${id} not found`);
    }
    return foundPatient;
  }
}
