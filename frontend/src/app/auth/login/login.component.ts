import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

//standalone shared components
import { TopbarComponent } from '../../shared/components/topbar/topbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, TopbarComponent, FooterComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Logging in:', form.value);
      // Call AuthService login logic here
      form.reset();
    }
  }

  navigateToRegister() {
    this.router.navigate(['/auth/register']);
  }
}
