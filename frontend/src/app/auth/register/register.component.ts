import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TopbarComponent } from '../../shared/components/topbar/topbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, TopbarComponent, FooterComponent,],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Registering:', form.value);
      // Call service to register
      form.reset();
    }
  }

  navigateToLogin() {
    this.router.navigate(['/auth/login']);
  }
}
