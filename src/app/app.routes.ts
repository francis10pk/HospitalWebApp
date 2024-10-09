import { Routes } from '@angular/router';
import { NurseLoginComponent } from './components/nurse-login/nurse-login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { NurseDashboardComponent } from './components/nurse-dash-board/nurse-dash-board.component';
import { CreateEditPatientComponent } from './components/create-patient/create-edit-patient.component';


export const routes: Routes = [
    { path: 'nurse-login', component: NurseLoginComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'dashboard',component: NurseDashboardComponent},
    // {path: 'create-patient', component: CreateEditPatientComponent},
    // {path: 'search-patient', component: NurseDashboardComponent},
    // {path: 'record-vitals', component: NurseDashboardComponent},
    { path: '', redirectTo: '/nurse-login', pathMatch: 'full' },
    { path: 'patients/edit/:id', component: CreateEditPatientComponent },
];
