import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  // constructor(private router: Router) {}

  // logout() {
  //   // You can expand this with actual logic later
  //   this.router.navigate(['/login']);
  // }
}
