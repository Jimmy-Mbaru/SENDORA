import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-user-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
})
export class UserNavbarComponent {
  constructor(public router: Router) {}

  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }
}
