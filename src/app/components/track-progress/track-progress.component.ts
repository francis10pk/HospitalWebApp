import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { Patient } from '../../models/patient';
import { VitalServiceService } from '../../services/vital-service.service'; // Import VitalServiceService
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { Chart, registerables } from 'chart.js'; // Import Chart.js

Chart.register(...registerables); // Register chart.js components

@Component({
  selector: 'app-track-progress',
  standalone: true,
  imports: [FormsModule, BaseChartDirective, CommonModule],
  templateUrl: './track-progress.component.html',
  styleUrls: ['./track-progress.component.css'],
})
export class TrackProgressComponent implements OnInit {
  @Input() patientId!: number; // Input to accept patientId
  public patient: Patient | null | undefined; // Allow for undefined to handle cases where patient is not found
  public chartData: number[] = []; // Holds chart data
  public chartLabels: string[] = []; // Holds chart labels


  constructor(private vitalService: VitalServiceService) {}

  ngOnInit() {
  }

  loadPatientData() {
    console.log('Selected patient ID:', this.patientId);  // Add a log here
    this.patient = this.vitalService.getPatientById(this.patientId); // Fetch patient data based on ID
    if (this.patient) {
      // Populate chart data if patient is found
      this.chartData = [
        this.patient.vitals.weight,
        this.patient.vitals.height,
        this.patient.vitals.heartRate,
        +this.patient.vitals.bloodPressure.split('/')[0], // Convert blood pressure to number
        +this.patient.vitals.sugarLevel // Ensure sugar level is a number
      ];

      // Set chart labels
      this.chartLabels = ['Weight', 'Height', 'Heart Rate', 'Blood Pressure', 'Sugar Level'];
    } else {
      // Handle case when the patient is not found (undefined or null)
      console.error('Patient not found for ID:', this.patientId);

      // Reset chart data and labels to empty arrays to avoid displaying incorrect information
      this.chartData = [];
      this.chartLabels = [];

    
      }
    }
  }

