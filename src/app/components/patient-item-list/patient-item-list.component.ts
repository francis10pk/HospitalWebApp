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
  @Input() patient!: Patient;
  constructor() {
    };
  }
