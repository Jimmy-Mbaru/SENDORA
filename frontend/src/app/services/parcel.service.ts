import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ParcelService {
  private apiUrl = `${environment.apiUrl}/parcels`;

  constructor(private http: HttpClient) {}

  createParcel(data: {
    senderId: string;
    recipientId: string;
    description: string;
    pickupLocationId: string;
    deliveryLocationId: string;
    weightCategory: 'LIGHT' | 'MEDIUM' | 'HEAVY';
  }) {
    return this.http.post(this.apiUrl, data);
  }

  getAllParcels() {
    return this.http.get<any[]>(this.apiUrl);
  }

  updateParcelStatus(parcelId: string, status: 'IN_TRANSIT' | 'DELIVERED') {
    return this.http.patch(`${this.apiUrl}/${parcelId}/status`, { status });
  }
}
