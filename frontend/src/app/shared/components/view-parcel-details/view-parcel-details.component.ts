import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';



@Component({
  selector: 'app-view-parcel-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-parcel-details.component.html',
  styleUrls: ['./view-parcel-details.component.css'],
})
export class ViewParcelDetailsComponent {
  parcelId!: string;
  parcel: any;

  constructor(private route: ActivatedRoute, private router: Router, private location: Location) {}

  ngOnInit() {
    this.parcelId = this.route.snapshot.paramMap.get('id')!;
    this.fetchParcel(this.parcelId);
  }

  fetchParcel(id: string) {
    // Mock parcel data
    this.parcel = {
      id: `#${id}`,
      pickup: 'Springfield',
      destination: 'Shelbyville',
      status: 'In Transit',
      sender: 'John Doe',
      receiver: 'Jane Smith',
      weightCategory: 'Heavy',
    };
  }

goBack(): void {
  this.location.back();
}

}
