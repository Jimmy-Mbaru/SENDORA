import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import * as L from 'leaflet';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ParcelService } from '../../../services/parcel.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-view-parcel-details',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './view-parcel-details.component.html',
  styleUrls: ['./view-parcel-details.component.css'],
})
export class ViewParcelDetailsComponent {
  parcelId!: string;
  parcel: any;
  map!: L.Map;
  animatedMarker!: L.Marker;
  routeCoords: [number, number][] = [];
  currentIndex = 0;
  intervalRef: any;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private parcelService: ParcelService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.parcelId = this.route.snapshot.paramMap.get('id')!;
    this.fetchParcel(this.parcelId);
  }

  fetchParcel(id: string) {
    this.parcelService.getParcelById(id).subscribe((data) => {
      this.parcel = {
        id: data.id,
        pickup: data.pickupLocation?.name || '',
        destination: data.deliveryLocation?.name || '',
        status: data.status?.toLowerCase() || '',
        senderName: data.sender?.name || '',
        receiverName: data.recipient?.name || '',
        weightCategory: data.weightCategory,
        pickupCoords: {
          lat: data.pickupLocation?.latitude,
          lng: data.pickupLocation?.longitude,
        },
        deliveryCoords: {
          lat: data.deliveryLocation?.latitude,
          lng: data.deliveryLocation?.longitude,
        },
      };

      setTimeout(() => this.loadMap(), 0); // Ensure DOM is ready
    });
  }

  loadMap() {
    const pickup = this.parcel.pickupCoords;
    const delivery = this.parcel.deliveryCoords;

    if (this.map) this.map.remove();

    this.map = L.map('parcelMap').setView([pickup.lat, pickup.lng], 8);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);

    const pinIcon = L.icon({
      iconUrl: '/icons/mdi_pin-outline.svg',
      iconSize: [50, 50],
      iconAnchor: [25, 50],
    });

    L.marker([pickup.lat, pickup.lng], { icon: pinIcon })
      .addTo(this.map)
      .bindPopup(`Pickup: ${this.parcel.pickup}`);

    L.marker([delivery.lat, delivery.lng], { icon: pinIcon })
      .addTo(this.map)
      .bindPopup(`Destination: ${this.parcel.destination}`);

    const apiKey = environment.openRouteApiKey;
    const url = 'https://api.openrouteservice.org/v2/directions/driving-car/geojson';
    const body = {
      coordinates: [
        [pickup.lng, pickup.lat],
        [delivery.lng, delivery.lat],
      ],
    };

    const headers = {
      Authorization: apiKey,
      'Content-Type': 'application/json',
    };

    this.http.post(url, body, { headers }).subscribe((res: any) => {
      this.routeCoords = res.features[0].geometry.coordinates.map((c: any) => [c[1], c[0]]);
      const route = L.polyline(this.routeCoords, { color: 'blue', weight: 4 }).addTo(this.map);
      this.map.fitBounds(route.getBounds(), { padding: [50, 50] });

      this.animateParcel();
    });
  }

  animateParcel() {
    if (!this.routeCoords.length) return;

    const truckIcon = L.icon({
      iconUrl: '/icons/lucide_dot.svg',
      iconSize: [80, 80],
      iconAnchor: [40, 40],
    });

    this.animatedMarker = L.marker(this.routeCoords[0], {
      icon: truckIcon,
      title: 'Current Location',
    }).addTo(this.map);

    this.animatedMarker.bindPopup('Fetching location...');

    // Hover listeners
    this.animatedMarker.on('mouseover', () => this.animatedMarker.openPopup());
    this.animatedMarker.on('mouseout', () => this.animatedMarker.closePopup());

    this.currentIndex = 0;

    this.intervalRef = setInterval(() => {
      if (this.currentIndex < this.routeCoords.length) {
        const [lat, lng] = this.routeCoords[this.currentIndex];
        this.animatedMarker.setLatLng([lat, lng]);
        this.map.panTo([lat, lng]);

        this.reverseGeocode(lat, lng).then((locationName) => {
          this.animatedMarker.setPopupContent(`📍 ${locationName}`);
        });

        this.currentIndex++;
      } else {
        clearInterval(this.intervalRef);
      }
    }, 1000);
  }

  reverseGeocode(lat: number, lng: number): Promise<string> {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
    return this.http.get<any>(url, {
      headers: { 'Accept-Language': 'en' },
    }).toPromise()
      .then((res) => res.display_name || 'Unknown Location')
      .catch(() => 'Location unavailable');
  }

  goBack(): void {
    if (this.intervalRef) clearInterval(this.intervalRef);
    this.location.back();
  }
}
