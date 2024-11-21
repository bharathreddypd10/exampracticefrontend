import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { LogoutService } from '../../logoutservice/logout.service';

@Component({
  selector: 'app-usernavbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './usernavbar.component.html',
  styleUrl: './usernavbar.component.css'
})
export class UsernavbarComponent {

  constructor(private logoutService:LogoutService){}

  onLogout(): void {
    this.logoutService.logout();
  }

}
