import { Component, OnInit } from '@angular/core';

interface Driver {
  name: string;
  role: string;
  vehicle: {
    make: string;
    model: string;
    color: string;
    licensePlate: string;
  };
  location: {
    address: string;
    latitude: number;
    longitude: number;
  };
}

@Component({
  selector: 'app-driver-track',
  templateUrl: './driver-track.component.html',
  styleUrl: './driver-track.component.css'
})
export class DriverTrackComponent implements OnInit {
  driver: Driver = {
    name: 'John Doe',
    role: 'Driver',
    vehicle: {
      make: 'Toyota',
      model: 'Corolla',
      color: 'Blue',
      licensePlate: 'ABC 123',
    },
    location: {
      address: '51.4771, -0.0014',
      latitude: 51.4771,
      longitude: -0.0014,
    },
  };

  arrivalTime = 5;

  ngOnInit() {
    this.updateArrivalTime();
    this.updateDriverLocation();
  }

  updateArrivalTime() {
    setInterval(() => {
      this.arrivalTime--;
    }, 1000);
  }

  updateDriverLocation() {
    setInterval(() => {
      // Simulate the driver's movement
      this.driver.location.latitude += (Math.random() - 0.5) * 0.01;
      this.driver.location.longitude += (Math.random() - 0.5) * 0.01;
      this.driver.location.address = `${this.driver.location.latitude.toFixed(4)}, ${this.driver.location.longitude.toFixed(4)}`;
    }, 5000);
  }
}
