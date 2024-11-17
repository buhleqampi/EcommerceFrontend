import { Component } from '@angular/core';

@Component({
  selector: 'app-track-delivery',
  templateUrl: './track-delivery.component.html',
  styleUrl: './track-delivery.component.css'
})
export class TrackDeliveryComponent {
  trackingSteps = [
    'Order Placed',
    'Preparing for Shipment',
    'Shipped',
    'Out for Delivery',
    'Delivered'
  ];

  currentStep = 0;
  currentDateTime = this.getCurrentDateTime();

  getCurrentDateTime(): string {
    const currentDate = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[currentDate.getMonth()];
    const day = currentDate.getDate().toString().padStart(2, '0');
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    return `${month} ${day}, ${hours}:${minutes}`;
  }

  constructor() {
    this.updateTrackingStatus();
  }

  updateTrackingStatus() {
    setInterval(() => {
      this.currentStep++;
      if (this.currentStep >= this.trackingSteps.length) {
        this.currentStep = this.trackingSteps.length - 1;
      }
    }, 5000); // Update every 2 seconds
  }
  onDelivered() {
    this.currentStep = this.trackingSteps.length - 1;
  }
}
