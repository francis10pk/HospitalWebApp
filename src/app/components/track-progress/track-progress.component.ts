import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Patient } from '../../models/patient';
import { VitalServiceService } from '../../services/vital-service.service';
import { Chart } from 'chart.js/auto';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-track-progress',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './track-progress.component.html',
  styleUrls: ['./track-progress.component.css'],
  providers: []
})
export class TrackProgressComponent implements OnInit {
  @Input() patientId!: number; // Input to accept patientId
  public patient: Patient | null | undefined; // Allow for undefined to handle cases where patient is not found
  public chartData: number[] = []; // Holds chart data
  public chartLabels: string[] = []; // Holds chart labels


  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>; // Reference to canvas element
  private chart!: Chart; // Holds the chart instance

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

      // Render the chart with the updated data
      this.renderChart();
    } else {
      // Handle case when the patient is not found (undefined or null)
      console.error('Patient not found for ID:', this.patientId);

      // Reset chart data and labels to empty arrays to avoid displaying incorrect information
      this.chartData = [];
      this.chartLabels = [];

      // Destroy chart if there's no data
      if (this.chart) {
        this.chart.destroy();
      }
    }
  }

  private renderChart() {
    if (this.chart) {
      this.chart.destroy(); // Destroy existing chart before creating a new one
    }

    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'bar', // You can change this to 'line', 'pie', etc.
      data: {
        labels: this.chartLabels,
        datasets: [
          {
            label: 'Patient Vitals',
            data: this.chartData,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
