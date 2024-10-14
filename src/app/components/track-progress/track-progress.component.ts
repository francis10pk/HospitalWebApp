import { Component, Input, OnInit } from '@angular/core';
import { Patient } from '../../models/patient';
import { VitalServiceService } from '../../services/vital-service.service';

@Component({
  selector: 'app-track-progress',
  standalone: true,
  imports: [],
  templateUrl: './track-progress.component.html',
  styleUrl: './track-progress.component.css',
  providers: []
})
export class TrackProgressComponent implements OnInit{
  @Input() patientId!: number; // Input to accept patientId
  public patient: Patient | null | undefined; // Allow for undefined to handle cases where patient is not found
  public chartData: number[] = []; // Holds chart data
  public chartLabels: string[] = []; // Holds chart labels
  
  constructor(private vitalService: VitalServiceService) {}
  ngOnInit() {
    this.loadPatientData(); // Load patient data on init
  }
  private loadPatientData() {
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
