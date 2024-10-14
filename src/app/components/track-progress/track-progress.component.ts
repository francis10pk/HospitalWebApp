// import { Component, Input, OnInit } from '@angular/core';
// import { provideCharts } from 'ng2-charts';
// import { Patient } from '../../models/patient';
// import { VitalServiceService } from '../../services/vital-service.service'; // Ensure you import this service

// @Component({
//   selector: 'app-track-progress',
//   standalone: true,
//   imports:[],
//   templateUrl: './track-progress.component.html',
//   styleUrls: ['./track-progress.component.css'],
//   providers: [provideCharts()] // Providing the charts service
// })
// export class TrackProgressComponent implements OnInit {
//   @Input() patientId!: number; // Expect patientId as input
//   public patient: Patient | null | undefined; // Allow for undefined
//   public chartData: number[] = [];
//   public chartLabels: string[] = [];
  
//   constructor(private vitalService: VitalServiceService) {}

//   ngOnInit() {
//     this.loadPatientData(); // Load patient data on init
//   }

//   private loadPatientData() {
//     this.patient = this.vitalService.getPatientById(this.patientId); // Fetch the patient using the service

//     if (this.patient) {
//       this.chartData = [
//         this.patient.vitals.weight,
//         this.patient.vitals.height,
//         this.patient.vitals.heartRate,
//         +this.patient.vitals.bloodPressure.split('/')[0], // Convert to number if necessary
//         +this.patient.vitals.sugarLevel // Ensure this is a number
//       ];

//       this.chartLabels = ['Weight', 'Height', 'Heart Rate', 'Blood Pressure', 'Sugar Level'];
//     } else {
//       // Handle the case where the patient is not found
//       console.error('Patient not found for ID:', this.patientId);
//       this.chartData = []; // Reset chart data
//       this.chartLabels = []; // Reset chart labels
//     }
//   }
// }
import { Component, Input, OnInit } from '@angular/core';
import { Patient } from '../../models/patient';
import { VitalServiceService } from '../../services/vital-service.service'; // Import VitalServiceService

@Component({
  selector: 'app-track-progress',
  standalone: true,
  imports: [],
  templateUrl: './track-progress.component.html',
  styleUrls: ['./track-progress.component.css'],
  providers: [] // No need for ng2-charts provider
})
export class TrackProgressComponent implements OnInit {
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
