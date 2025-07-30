import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private apiUrl = `${environment.apiUrl}/analytics`;

  constructor(private http: HttpClient) {}

  getDashboardStats() {
    return this.http.get<{
      delivered: number;
      inTransit: number;
      totalUsers: number;
      recentParcels: {
        id: string;
        pickup: string;
        destination: string;
        status: 'DELIVERED' | 'IN_TRANSIT';
      }[];
    }>(`${this.apiUrl}/dashboard`, { withCredentials: true });
  }
}
