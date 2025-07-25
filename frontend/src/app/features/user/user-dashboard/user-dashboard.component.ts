import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DashboardTopbarComponent } from '../../../shared/components/dashboard-topbar/dashboard-topbar.component';
import { UserNavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { FooterComponent } from "../../../shared/components/footer/footer.component";



@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, UserNavbarComponent, DashboardTopbarComponent, FooterComponent],
  templateUrl: './user-dashboard.component.html',
})
export class UserDashboardComponent {}
