import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardTopbarComponent } from "../../../shared/components/dashboard-topbar/dashboard-topbar.component";
import { SidebarComponent } from "../../../shared/components/sidebar/sidebar.component";
import { LocationService } from '../../../services/location.service';
import { UserService } from '../../../services/user.service';
import { ParcelService } from '../../../services/parcel.service';

@Component({
  standalone: true,
  selector: 'app-create-parcel-form',
  imports: [CommonModule, FormsModule, DashboardTopbarComponent, SidebarComponent],
  templateUrl: './create-parcel-form.component.html',
  styleUrls: ['./create-parcel-form.component.css'],
})
export class CreateParcelFormComponent implements OnInit {
  form = {
    senderId: '',
    recipientId: '',
    description: '',
    pickup: '',
    delivery: '',
    weight: '',
  };

  availableRegions: any[] = [];
  users: any[] = [];

  constructor(
    private locationService: LocationService,
    private userService: UserService,
    private parcelService: ParcelService
  ) { }

  ngOnInit(): void {
    this.locationService.getAll().subscribe({
      next: (locations) => {
        this.availableRegions = locations;
      },
      error: (err) => {
        console.error('Failed to load locations:', err);
      },
    });

    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (err) => {
        console.error('Failed to load users:', err);
      },
    });
  }

  createParcel() {
    // Basic validation
    if (
      !this.form.senderId ||
      !this.form.recipientId ||
      !this.form.description ||
      !this.form.pickup ||
      !this.form.delivery ||
      !this.form.weight
    ) {
      alert('Please fill out all required fields.');
      return;
    }

    const payload = {
      senderId: this.form.senderId,
      recipientId: this.form.recipientId,
      description: this.form.description,
      pickupLocationId: this.form.pickup,
      deliveryLocationId: this.form.delivery,
      weightCategory: this.form.weight.toUpperCase() as 'LIGHT' | 'MEDIUM' | 'HEAVY',
    };


    this.parcelService.createParcel(payload).subscribe({
      next: () => {
        alert('Parcel created successfully!');
        this.form = {
          senderId: '',
          recipientId: '',
          description: '',
          pickup: '',
          delivery: '',
          weight: '',
        };
      },
      error: (err) => {
        console.error('Parcel creation failed:', err);
        alert('Failed to create parcel.');
      },
    });
  }
}
