import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-business-admin',
  templateUrl: './business-admin.component.html',
  styleUrl: './business-admin.component.css'
})
export class BusinessAdminComponent implements OnInit {
  constructor(private router: Router) {}

  navigateToRoute(route: string) {
    this.router.navigate([route]);
  }
  salesValue: number = 0;
  visitorsValue: number = 0;
  ordersValue: number = 0;

  
  ngOnInit() {
    this.updateData();
    setInterval(() => {
      this.updateData();
    }, 2000);
  }

  updateData() {
    this.salesValue = this.salesValue + 500;
    this.visitorsValue = this.visitorsValue + 50;
    this.ordersValue = this.ordersValue + 5;
  }

  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }
  openedBox: string | null = null;

  toggleBox(box: string): void {
    this.openedBox = this.openedBox === box ? null : box;
  }
  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
  currentDeliveries: number = 50;
  previousDeliveries: number = 100;
}

