import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sent',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sent.component.html',
})
export class SentComponent {
  sentParcels = [
    { id: 'SND001', to: 'John Doe', destination: 'Nairobi', status: 'in transit' },
    { id: 'SND002', to: 'Jane Smith', destination: 'Mombasa', status: 'delivered' },
    { id: 'SND003', to: 'Alice Johnson', destination: 'Kisumu', status: 'in transit' },
  ];
}
