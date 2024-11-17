import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapTrackingService {

  constructor() { }

   destination = new BehaviorSubject<any>({});
   driver_location = new BehaviorSubject<any>({});

   mSetDestination(data:any){
    this.destination.next(data);
   }

   mSetDriverLocation(data:any){
    this.driver_location.next(data);
   }

   mGetDestination():Observable<any>{
      return this.destination
   }

   mGetDriverLocation():Observable<any>{
    return this.driver_location;
   }
}
