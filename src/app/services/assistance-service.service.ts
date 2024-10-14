import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AssistanceServiceService {

  constructor() { }
  // Check if assistance is needed based on patient vitals
  checkAssistanceNeeded(vitals: any): boolean {
    // Example logic: If heart rate is too high or low, or if blood pressure is abnormal
    const heartRate = vitals.heartRate;
    const bloodPressure = vitals.bloodPressure;
    // Simple health check conditions (you can make this more complex)
    if (heartRate < 60 || heartRate > 100) {
      return true;  // Assistance needed due to abnormal heart rate
    }
    
    const bpValues = bloodPressure.split('/');
    if (bpValues[0] < 90 || bpValues[0] > 140 || bpValues[1] < 60 || bpValues[1] > 90) {
      return true;  // Assistance needed due to abnormal blood pressure
    }
    return false;  // No assistance needed if conditions are within normal range
  }
}
