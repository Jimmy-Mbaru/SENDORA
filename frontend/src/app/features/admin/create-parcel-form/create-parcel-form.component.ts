import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardTopbarComponent } from "../../../shared/components/dashboard-topbar/dashboard-topbar.component";
import { SidebarComponent } from "../../../shared/components/sidebar/sidebar.component";

@Component({
  standalone: true,
  selector: 'app-create-parcel-form',
  imports: [CommonModule, FormsModule, DashboardTopbarComponent, SidebarComponent],
  templateUrl: './create-parcel-form.component.html',
  styleUrls: ['./create-parcel-form.component.css'],
})
export class CreateParcelFormComponent {
  form = {
    sender: '',
    recipient: '',
    email: '',
    description: '',
    pickup: '',
    delivery: '',
    weight: '',
    eta: '',
  };

  availableRegions: string[] = [
    'Nairobi',
    'Mombasa',
    'Kisumu',
    'Nakuru',
    'Eldoret',
    'Thika',
    'Nyeri',
    'Kitale',
    'Machakos',
    'Kericho',
    'Malindi'
  ];

  createParcel() {
    console.log('Parcel created:', this.form);
    alert('Delivery Order Created (Dummy)');
  }
}

