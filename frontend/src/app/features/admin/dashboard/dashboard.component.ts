import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../services/admin.service';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { DashboardTopbarComponent } from '../../../shared/components/dashboard-topbar/dashboard-topbar.component';
import { StatCardComponent } from '../stat-cards/stat-cards.component';
import { PieChartComponent } from '../pie-chart/pie-chart.component';
import { ParcelTableComponent } from '../parcel-table/parcel-table.component';

type ParcelStatus = 'Delivered' | 'In Transit';

type ParcelTableRow = {
  id: string;
  pickup: string;
  destination: string;
  status: ParcelStatus;
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    DashboardTopbarComponent,
    StatCardComponent,
    PieChartComponent,
    ParcelTableComponent,
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  totalUsers = 0;
  delivered = 0;
  inTransit = 0;
  parcelChartData = { delivered: 0, inTransit: 0 };
  recentParcels: ParcelTableRow[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getDashboardStats().subscribe({
      next: (data) => {
        this.totalUsers = data.totalUsers;
        this.delivered = data.delivered;
        this.inTransit = data.inTransit;
        this.parcelChartData = {
          delivered: data.delivered,
          inTransit: data.inTransit,
        };

        this.recentParcels = data.recentParcels.map((parcel: any): ParcelTableRow => ({
          id: parcel.id,
          pickup: parcel.pickup,
          destination: parcel.destination,
          status: parcel.status === 'DELIVERED' ? 'Delivered' : 'In Transit',
        }));
      },
      error: (err) => {
        console.error('Failed to load dashboard stats:', err);
      },
    });
  }
}
