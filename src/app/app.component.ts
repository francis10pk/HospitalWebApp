import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NurseLoginComponent } from "./components/nurse-login/nurse-login.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NurseLoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'HospitalWebApp';
}
