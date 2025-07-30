import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-dashboard-topbar',
  standalone: true,
  templateUrl: './dashboard-topbar.component.html',
})
export class DashboardTopbarComponent {
  constructor(private router: Router, private authService: AuthService) {}

  goToProfile() {
    const user = this.authService.getCurrentUser();
    if (!user) {
      this.router.navigate(['/auth/login']);
    } else if (user.role === 'ADMIN') {
      this.router.navigate(['/admin/profile']);
    } else {
      this.router.navigate(['/user-dashboard/profile']);
    }
  }
}
