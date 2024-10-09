import { Component, Input } from '@angular/core';
import { Patient } from '../../models/patient';
@Component({
  selector: 'app-patient-item-list',
  standalone: true,
  imports: [],
  templateUrl: './patient-item-list.component.html',
  styleUrl: './patient-item-list.component.css'
})
export class PatientItemListComponent {
  @Input() patient: Patient;
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
}
