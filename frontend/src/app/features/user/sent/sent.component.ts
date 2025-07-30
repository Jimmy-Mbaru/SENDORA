import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ParcelService } from '../../../services/parcel.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-sent',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sent.component.html',
})
export class SentComponent implements OnInit {
  sentParcels: any[] = [];
  currentUser: any;

  constructor(
    private parcelService: ParcelService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.parcelService.getAllParcels().subscribe((data) => {
      this.sentParcels = data
        .filter((p) => p.senderId === this.currentUser.userId)
        .map((p) => ({
          id: p.id,
          recipientName: p.recipient?.name || '—',
          destination: p.deliveryLocation?.name || '—',
          status: p.status === 'DELIVERED' ? 'delivered' : 'in transit',
        }));
    });
  }

}
