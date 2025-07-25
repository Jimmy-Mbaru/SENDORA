import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardTopbarComponent } from "../../../shared/components/dashboard-topbar/dashboard-topbar.component";
import { SidebarComponent } from "../../../shared/components/sidebar/sidebar.component";
import { RouterLink } from '@angular/router';


@Component({
  standalone: true,
  selector: 'app-view-parcels',
  imports: [CommonModule, FormsModule, DashboardTopbarComponent, SidebarComponent, RouterLink],
  templateUrl: './view-parcels.component.html',
})
export class ViewParcelsComponent {
  parcels = [
    {
      id: 'PCL-001',
      pickup: 'Nairobi',
      destination: 'Mombasa',
      status: 'in-transit',
    },
    {
      id: 'PCL-002',
      pickup: 'Kisumu',
      destination: 'Eldoret',
      status: 'delivered',
    },
  ];

  updateStatus(parcel: any, newStatus: string) {
    parcel.status = newStatus;
  }

  trackParcel(parcelId: string) {
    // Placeholder
    alert(`Tracking Parcel ${parcelId}...`);
  }
}
