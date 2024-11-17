import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart-service/cart.service';
import { of } from 'rxjs';
import { OrdersService } from '../../../services/orders/orders.service';
import { Driver } from '../../../interfaces/driver';
import { Order } from '../../../interfaces/order';
import { ActivatedRoute } from '@angular/router';
import { ProductDbResponse } from '../../../interfaces/productDbResponse';

@Component({
  selector: 'app-driver-dash',
  templateUrl: './driver-dash.component.html',
  styleUrl: './driver-dash.component.css'
})
export class DriverDashComponent implements OnInit{
  orders: Order[] = [];
  error: string | null = null;

  constructor( private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.getAllOrders()
  }

  getAllOrders(){

    this.ordersService.getAllDriverOrders("1234567890").subscribe({
      next: (data: any) =>{

        this.orders = data.reverse();
        
      // this.orders = data.Orders
      console.log('Data received from getAllOrders:', this.orders); // Log the entire response object
        
      },
      error: (err) => {
        console.error('Error fetching orders:', err);
      }
    })
  }

  passOrder(order:Order){
    this.ordersService.mPassOrder(order);
  }

  updateOrderStatus(orderId: string, newStatus: string) {
    const updatedOrder: Partial<Order> = { status: newStatus };
    this.ordersService.updateOrder(orderId, updatedOrder)
      .subscribe(
        response => {
          // Handle successful update (e.g., update order object in your component)
          console.log('Order updated successfully!', this.orders);
        },
        error => {
          // Handle error (e.g., display error message to the user)
          console.error('Error updating order:', error);
        }
      );
  }

//   orderData = [
//     {
//       orderNo:"SHU23456789",
//       name: "Sfiso",
//       location: {lat:345678, lon:3456789},
//       address:"106 camps bay honn",
//       item:"1kg",
//       status:"out-for-delivery",
//       pay_mode: "cash",
//       price:200,
//   }, 
//   {
//     orderNo:"SHU87867",
//     name: "ben",
//     location: {lat:3421678, lon:34567389},
//     address:"17 philippi",
//     item:"9kg",
//     status:"out-for-delivery",
//     pay_mode: "card",
//     price:600,
//   }, 
//   {
//     orderNo:"SHU987656",
//     name: "mike",
//     location: {lat:66765267, lon:232328},
//     address:"phillipi village",
//     item:"19kg",
//     status:"delivered",
//     pay_mode: "cash",
//     price:200,
//   }, 
//   {
//     orderNo:"SHU23456789",
//     name: "Sfiso",
//     location: {lat:345678, lon:3456789},
//     address:"106 camps bay honn",
//     item:"1kg",
//     status:"out-for-delivery",
//     pay_mode: "cash",
//     quantity: 1,
//     price:200,
// }, 
// {
//   orderNo:"SHU87867",
//   name: "ben",
//   location: {lat:3421678, lon:34567389},
//   address:"17 philippi",
//   item:"9kg",
//   status:"out-for-delivery",
//   pay_mode: "card",
//   quantity: 1,
//   price:600,
// }, 
// {
//   orderNo:"SHU987656",
//   name: "mike",
//   location: {lat:66765267, lon:232328},
//   address:"phillipi village",
//   item:"19kg",
//   status:"delivered",
//   pay_mode: "cash",
//   quantity: 1,
//   price:200,
// }, 
// ]

}
