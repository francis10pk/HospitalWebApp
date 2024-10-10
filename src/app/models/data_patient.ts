import { Patient } from "./patient";

export const PATIENTS: Patient[] = [
  {
    id: 0,
    name: 'Francisco',
    age: 27,
    gender: 'Male',
    vitals: {
      weight: null,  
      height: null,
      bloodPressure: '',
      sugarLevel: null,
      heartRate: null
    },
    ongoingMedications: '',
    allergies: '',
    critical: false
  },
];
