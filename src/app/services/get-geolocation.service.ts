import { Injectable } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetGeolocationService {

  constructor() { }
  
  geocode?:google.maps.Geocoder;

  

  GetAddressGeolocation(address:string):Observable<any>{
   const loader = new Loader({
     apiKey: "AIzaSyCplHZjrn_yIDfbzbcKr6oA4LZz-E4FAzA",
     version: "weekly",
   });
const AddressData = new BehaviorSubject<any>(null);
     loader.load().then(async () => {

     const { Geocoder } = await google.maps.importLibrary("geocoding") as google.maps.GeocodingLibrary;
     this.geocode = new Geocoder();

           await this.geocode.geocode( { 'address': address}, function(results:any, status:any) {
             if (status == 'OK') {
                 // console.log(results[0].formatted_address)
                 //  console.log(results[0].geometry.location)
                  AddressData.next(results[0]);
               
               
             } else {
               alert('Unsuccessful for the following reason: ' + status);
             }
           });
     // this.mapInit.mInitMap(mapLoad)
   
   })
   
   return AddressData;
 }
}
