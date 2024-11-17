import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit{
  
  ngOnInit(): void {
    
  }
 
 constructor (private location: Location, private router: Router) {}

  gradient = false;
  showLegend = true;
  showLabels = true;
  isDoughnut = false;
  legendTitle = 'Legend';

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
  currentDeliveries: number = 0;
  previousDeliveries: number = 0;
  goBack() {
    this.location.back();
  }
}
