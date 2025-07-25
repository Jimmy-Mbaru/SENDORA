import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../footer/footer.component";
import { TopbarComponent } from "../topbar/topbar.component";
import { Location } from '@angular/common';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FooterComponent, TopbarComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(private router: Router, private location: Location) {}

  goBack(): void {
  this.location.back();
}

}
