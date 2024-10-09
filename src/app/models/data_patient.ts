import { Patient } from "./patient";

export const PATIENTS: Patient[] = [
    {id: 0,
    name: 'Francisco',
    age: 27,
    gender: 'Male',
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
  },
]