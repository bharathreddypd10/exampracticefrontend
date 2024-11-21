import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { UsernavbarComponent } from "../../usernavbar/usernavbar/usernavbar.component";

@Component({
  selector: 'app-userdashboard',
  standalone: true,
  imports: [UsernavbarComponent,RouterModule],
  templateUrl: './userdashboard.component.html',
  styleUrl: './userdashboard.component.css'
})
export class UserdashboardComponent {

}
