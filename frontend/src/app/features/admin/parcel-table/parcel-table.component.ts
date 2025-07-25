import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-parcel-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './parcel-table.component.html',
})
export class ParcelTableComponent {
  parcels = [
    {
      id: 'PKG12345',
      pickup: 'Nairobi CBD',
      destination: 'Kisumu Town',
      status: 'Delivered'
    },
    {
      id: 'PKG67890',
      pickup: 'Mombasa Port',
      destination: 'Eldoret',
      status: 'In Transit'
    },
    {
      id: 'PKG54321',
      pickup: 'Thika Road',
      destination: 'Kitale',
      status: 'Delivered'
    }
  ];
}

