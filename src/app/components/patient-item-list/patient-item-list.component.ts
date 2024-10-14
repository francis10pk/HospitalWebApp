import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Patient } from '../../models/patient';
@Component({
  selector: 'app-patient-item-list',
  standalone: true,
  imports: [],
  templateUrl: './patient-item-list.component.html',
  styleUrl: './patient-item-list.component.css'
})
export class PatientItemListComponent {
  @Input() patient!: Patient;
  @Output() patientSelected = new EventEmitter<Patient>();
  constructor() {
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
viewDetails(id: number): void {
  // Emit the selected patient to the parent component
  this.patientSelected.emit(this.patient);
  }
} 
