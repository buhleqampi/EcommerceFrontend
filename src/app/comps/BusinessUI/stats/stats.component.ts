import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent {
  openedBox: string | null = null;
  
  constructor ( private location: Location) {}
  toggleBox(box: string): void {
    this.openedBox = this.openedBox === box ? null : box;
  }
  goBack() {
    this.location.back();
  }
}
