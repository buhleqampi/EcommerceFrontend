import { Component, OnInit } from '@angular/core';
import { Loader } from "@googlemaps/js-api-loader"
import { MapTrackingService } from '../../../services/map-tracking.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})

export class MapComponent implements OnInit {

 constructor(private location_listener:MapTrackingService){}

  ngOnInit(): void {
    // this.initmap();
  }

}

