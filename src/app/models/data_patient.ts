import { Patient } from "./patient";

export const PATIENTS: Patient[] = [
  {
    id: 0,
    name: 'Francisco',
    age: 27,
    gender: 'Male',
    vitals: {
      weight: 70,  
      height: 175,
      bloodPressure: '120/80',
      sugarLevel: 90,
      heartRate: 72
    },
    ongoingMedications: 'Aspirin',
    allergies: 'None',
    critical: false
  },
  {
    id: 1,
    name: 'Sarah Johnson',
    age: 34,
    gender: 'Female',
    vitals: {
      weight: 65,
      height: 160,
      bloodPressure: '110/70',
      sugarLevel: 85,
      heartRate: 80
    },
    ongoingMedications: 'Metformin',
    allergies: 'Penicillin',
    critical: false
  },
  {
    id: 2,
    name: 'Michael Smith',
    age: 45,
    gender: 'Male',
    vitals: {
      weight: 85,
      height: 180,
      bloodPressure: '130/85',
      sugarLevel: 100,
      heartRate: 75
    },
    ongoingMedications: 'Lisinopril',
    allergies: 'Peanuts',
    critical: true
  },
  {
    id: 3,
    name: 'Emily Davis',
    age: 50,
    gender: 'Female',
    vitals: {
      weight: 58,
      height: 165,
      bloodPressure: '115/75',
      sugarLevel: 90,
      heartRate: 70
    },
    ongoingMedications: 'Insulin',
    allergies: 'Latex',
    critical: false
  },
  {
    id: 4,
    name: 'James Brown',
    age: 60,
    gender: 'Male',
    vitals: {
      weight: 78,
      height: 170,
      bloodPressure: '140/90',
      sugarLevel: 110,
      heartRate: 65
    },
    ongoingMedications: 'Atorvastatin',
    allergies: 'None',
    critical: true
  }
];
