import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart-service/cart.service';
import { of } from 'rxjs';
import { OrdersService } from '../../../services/orders/orders.service';
import { Order } from '../../../interfaces/order';
import { ActivatedRoute } from '@angular/router';
import { ProductDbResponse } from '../../../interfaces/productDbResponse';
import { Location } from '@angular/common';


@Component({
  selector: 'app-business-orders',
  templateUrl: './business-orders.component.html',
  styleUrl: './business-orders.component.css',
})
export class BusinessOrdersComponent implements OnInit {
  orders: Order[] = [];
  error: string | null = null;

  
  

  constructor( private ordersService: OrdersService, private location: Location) {}

  goBack() {
    this.location.back();
  }

  ngOnInit(): void {
    this.getAllOrders()

  } 

  getAllOrders(){

    this.ordersService.getAllOrders().subscribe({
      next: (data: any) =>{

        this.orders = data;
        
      // this.orders = data.Orders
      console.log('Data received from getAllOrders:', this.orders); // Log the entire response object
        
      },
      error: (err) => {
        console.error('Error fetching orders:', err);
      }
    })
  }


}
