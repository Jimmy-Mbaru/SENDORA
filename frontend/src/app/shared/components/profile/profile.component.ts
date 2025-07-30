import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FooterComponent, TopbarComponent, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any = null;
  editable: boolean = false;
  message: string = '';
  saving: boolean = false;

  constructor(
    private router: Router,
    private location: Location,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getMyProfile().subscribe({
      next: (data) => {
        this.user = { ...data };
      },
      error: () => {
        this.message = 'Failed to load profile.';
      },
    });
  }

  goBack(): void {
    this.location.back();
  }

  enableEdit(): void {
    this.editable = true;
  }

  saveProfile(): void {
    const updatePayload: any = {};

    if (this.user?.name?.trim()) updatePayload.name = this.user.name.trim();
    if (this.user?.cellphone?.trim()) updatePayload.cellphone = this.user.cellphone.trim();
    if (this.user?.paypal?.trim()) updatePayload.paypal = this.user.paypal.trim();

    if (Object.keys(updatePayload).length === 0) return;

    this.saving = true;

    this.authService.updateUserProfile(updatePayload).subscribe({
      next: (updated) => {
        this.user = { ...this.user, ...updated };
        this.message = 'Profile updated successfully.';
        this.editable = false;
        this.saving = false;
      },
      error: (err) => {
        this.message = 'Update failed.';
        this.saving = false;
        console.error('Profile update error:', err);
      },
    });
  }
}
