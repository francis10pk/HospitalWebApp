export interface Patient {
    id: number;
    name: string;
    age: number | null;
    gender: string;  
    vitals: Vitals;
    ongoingMedications: string;
    allergies: string;
    critical: boolean; // Flag if the patient is in a critical condition
  }
  export interface Vitals {
    weight: number | null;
    height: number | null;
    bloodPressure: string;
    sugarLevel: number | null;
    heartRate: number | null;
  }
  