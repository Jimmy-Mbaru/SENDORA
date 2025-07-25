import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent {
  @Input() delivered = 0;
  @Input() inTransit = 0;

  get deliveredPercent(): number {
    const total = this.delivered + this.inTransit;
    return total === 0 ? 0 : (this.delivered / total) * 100;
  }

  get inTransitPercent(): number {
    const total = this.delivered + this.inTransit;
    return total === 0 ? 0 : (this.inTransit / total) * 100;
  }
}
