import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-received',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './received.component.html',
})
export class ReceivedComponent {
  receivedParcels = [
    { id: 'RCV101', from: 'Derrick Lee', pickup: 'Eldoret', status: 'in transit' },
    { id: 'RCV102', from: 'Susan Mwangi', pickup: 'Thika', status: 'delivered' },
    { id: 'RCV103', from: 'Brian Otieno', pickup: 'Nakuru', status: 'in transit' },
  ];
}
