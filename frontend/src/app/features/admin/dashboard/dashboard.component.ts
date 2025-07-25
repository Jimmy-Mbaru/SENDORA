import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { DashboardTopbarComponent } from '../../../shared/components/dashboard-topbar/dashboard-topbar.component';
import { StatCardComponent } from '../stat-cards/stat-cards.component';
import { PieChartComponent } from '../pie-chart/pie-chart.component';
import { ParcelTableComponent } from '../parcel-table/parcel-table.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    DashboardTopbarComponent,
    StatCardComponent,
    PieChartComponent,
    ParcelTableComponent
  ],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  // Pie chart expects two inputs: delivered & inTransit
  parcelChartData = {
    delivered: 60,
    inTransit: 25
  };

  // Only valid statuses used for now: 'Delivered' | 'In Transit'
  recentParcels = [
    {
      id: 'PCK-001',
      sender: 'Jane Doe',
      receiver: 'John Smith',
      status: 'Delivered',
      date: '2025-07-18'
    },
    {
      id: 'PCK-002',
      sender: 'Mike N.',
      receiver: 'Laura K.',
      status: 'In Transit',
      date: '2025-07-19'
    },
    {
      id: 'PCK-003',
      sender: 'Alice A.',
      receiver: 'Bob B.',
      status: 'Delivered',
      date: '2025-07-20'
    }
  ];
}
