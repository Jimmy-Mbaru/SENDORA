import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DashboardTopbarComponent } from '../../../shared/components/dashboard-topbar/dashboard-topbar.component';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { ParcelService } from '../../../services/parcel.service';

@Component({
  standalone: true,
  selector: 'app-view-parcels',
  imports: [CommonModule, FormsModule, RouterLink, DashboardTopbarComponent, SidebarComponent],
  templateUrl: './view-parcels.component.html',
})
export class ViewParcelsComponent implements OnInit {
  parcels: any[] = [];

  constructor(private parcelService: ParcelService) { }

  ngOnInit(): void {
    this.fetchParcels();
  }

  fetchParcels() {
    this.parcelService.getAllParcels().subscribe({
      next: (data) => {
        this.parcels = data.map(parcel => ({
          id: parcel.id,
          pickup: parcel.pickupLocation?.name || '—',
          destination: parcel.deliveryLocation?.name || '—',
          status: this.mapBackendStatusToUI(parcel.status),
        }));
      },
      error: (err) => {
        console.error('Failed to load parcels:', err);
      },
    });
  }

  mapBackendStatusToUI(status: string): string {
    switch (status) {
      case 'IN_TRANSIT': return 'in-transit';
      case 'DELIVERED': return 'delivered';
      default: return status.toLowerCase();
    }
  }

  mapUIStatusToBackend(status: string): string {
    switch (status) {
      case 'in-transit': return 'IN_TRANSIT';
      case 'delivered': return 'DELIVERED';
      default: return status.toUpperCase();
    }
  }

  updateStatus(parcel: any, newStatus: string) {
    const backendStatus = this.mapUIStatusToBackend(newStatus) as 'IN_TRANSIT' | 'DELIVERED';

    this.parcelService.updateParcelStatus(parcel.id, backendStatus).subscribe({
      next: () => {
        console.log(`Parcel ${parcel.id} status updated to ${backendStatus}`);
      },
      error: (err) => {
        console.error('Status update failed:', err);
        alert('Failed to update parcel status.');
      },
    });
  }
}
