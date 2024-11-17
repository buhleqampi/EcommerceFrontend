import { Component, OnInit } from '@angular/core';
import { Order } from '../../../interfaces/order';
import { OrdersService } from '../../../services/orders/orders.service';
import { Loader } from '@googlemaps/js-api-loader';
import { CartService } from '../../../services/cart-service/cart.service';

let map: google.maps.Map;
let Destination_marker:any;
let Driver_marker:any;

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrl: './view-order.component.css'
})
export class ViewOrderComponent  implements OnInit{
item: any;
  cartService: any;

  constructor(private order_service: OrdersService){}

  order?:Order;
  ButtonText:string = "Complete Order"

  ngOnInit(): void {
    this.order_service.mGetPassOrder().subscribe((order:Order) => {
      this.order = order
      console.log(this.order)
      if(order.status == 'pending'){
        this.ButtonText = 'Start Order'
      }
      else if(order.status == 'complete'){
        this.ButtonText = order.status
      }
      else{
        
        // marker.position = location
        // marker.map = map
        // marker.title = "device location"
      }
    })

    this.initmap();

  
  }

  updateOrderStatus(){

    if(this.ButtonText == 'Start Order'){
      this.order_service.updateOrder(this.order?.id, {status:"in-progress", driverLoca: this.data[0]}).subscribe(() => {
        this.ButtonText = 'in-progress'
        this.order!.status = 'in-progress'
        this.initmap();
      })

    }
    else if(this.ButtonText == 'Complete Order'){
      this.order_service.updateOrder(this.order?.id, {status:"complete", driverLoca: this.data[this.data.length-1]}).subscribe(() => {
        this.ButtonText = 'complete'
        this.order!.status = 'complete'
      })
    }
    
  }

  data = [{lat:-33.909560, lng:18.414115}, {lat:-33.909247, lng:18.413890}, {lat:-33.908658, lng:18.413375},{lat:-33.908236, lng:18.413686}, {lat:-33.907914, lng:18.414147}, {lat:-33.907699, lng:18.414394},{lat:-33.907457, lng:18.414759}, {lat:-33.907250, lng:18.415081}, {lat:-33.907026, lng:18.415489}, , {lat:-33.906918, lng:18.415735}]

  async initmap(){
    const loader = new Loader({
      apiKey: "AIzaSyCMzKuxTk9J0bI4m7ppb9-Jg9RSV7lrIBw",
      version: "weekly",
    });

    let loca = {lat:this.order?.shippingAddress.coordinates.lat, lng: this.order?.shippingAddress.coordinates.lng}
    loader.load().then(async () => {
      const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
      const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
      map = new Map(document.getElementById("map") as HTMLElement, {
        center: loca,
        zoom: 15,
        mapId: "MyMap"
      });
      
      Destination_marker = new AdvancedMarkerElement({
        position: loca,
        map: map
      });
    });
  }


}
