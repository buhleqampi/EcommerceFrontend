import { Component, OnInit} from '@angular/core';
import { OrdersService } from '../../../services/orders/orders.service';
import { BehaviorSubject } from 'rxjs';
import { CartService } from '../../../services/cart-service/cart.service';
import { Order } from '../../../interfaces/order';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {
  date = new Date().toLocaleString()
  total:any
  orderedItems: any
  orderTotal$ = new BehaviorSubject<number>(0)

  constructor(private orderService : OrdersService, private cartService: CartService){}

  ngOnInit(): void {
    this.total = JSON.parse(`${localStorage.getItem('Total')}`)
    this.getAllOrders()

  }

  orders: Order[] = [];

  // getOrder(){
  //   const userId = "66865064ad57296a97884bc3"
  //   const cartId = "66865190d6231df3b77815f9"
  //   this.orderService.fetchOrder(userId).subscribe({
  //     next: (res)=>{
  //       // console.log(res)
  //       this.orders = res.reverse()
        
  //     },error: (err)=>{
  //       console.error("or",{userId, cartId} ,err)
  //     },
    // })
  // }

  passOrder(order:Order){
    this.orderService.mPassOrder(order);
  }


    getAllOrders(){
  
      this.orderService.getAllDriverOrders("1234567890").subscribe({
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
  }
