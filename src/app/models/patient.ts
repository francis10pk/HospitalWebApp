export interface Patient {
    id: number;
    name: string;
    age: number;
    gender: string;  
    vitals: Vitals;
    ongoingMedications: string;
    allergies: string;
    critical: boolean; // Flag if the patient is in a critical condition
  }
  
  export interface Vitals {
    weight: number;        
    height: number;        
    bloodPressure: string; 
    sugarLevel: number;    
    heartRate: number;     
  }
