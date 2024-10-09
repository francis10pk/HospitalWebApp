import { Routes } from '@angular/router';
import { NurseLoginComponent } from './components/nurse-login/nurse-login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { NurseDashBoardComponent } from './components/nurse-dash-board/nurse-dash-board.component';

export const routes: Routes = [
    { path: 'nurse-login', component: NurseLoginComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'dashboard',component: NurseDashBoardComponent},
    { path: '', redirectTo: '/nurse-login', pathMatch: 'full' },
];
