import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ParcelService } from '../../../services/parcel.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-received',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './received.component.html',
})
export class ReceivedComponent implements OnInit {
  receivedParcels: any[] = [];
  currentUser: any;

  constructor(
    private parcelService: ParcelService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.parcelService.getAllParcels().subscribe((data) => {
      this.receivedParcels = data
        .filter((p) => p.recipientId === this.currentUser.userId)
        .map((p) => ({
          id: p.id,
          senderName: p.sender?.name || '—',
          pickup: p.pickupLocation?.name || '—',
          status: p.status === 'DELIVERED' ? 'delivered' : 'in transit',
        }));
    });
  }

}
