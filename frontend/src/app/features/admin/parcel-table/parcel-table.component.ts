import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-parcel-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './parcel-table.component.html',
})
export class ParcelTableComponent {
  @Input() parcels: {
    id: string;
    pickup: string;
    destination: string;
    status: 'Delivered' | 'In Transit';
  }[] = [];
}
