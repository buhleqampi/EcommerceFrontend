import { Component } from '@angular/core';
import { Product } from '../../../interfaces/product';
import { CartService } from '../../../services/cart-service/cart.service';
import { OrdersService } from '../../../services/orders/orders.service';
import { Route, Router, RouterFeature } from '@angular/router';
import { GetGeolocationService } from '../../../services/get-geolocation.service';
import { finalize } from 'rxjs';
import { TokenService } from '../../../service/token.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartItems: Product[] = []
  items: any;
  totalAmount = this.cartService.totalAmount;
  cartItems1: any
  cart_id :any
  fullCart: any;
  address:string = ""
  isHidden: boolean = true
  message = ""
  user:any

  coordinates = {
    lat:0.0,
    lng:0.0
  }
  isSuccesful = false

  ButtonText = "CHECK ADDRESS"

  constructor(private cartService : CartService, 
            private orderService : OrdersService,
            private router: Router,
            private propertyGeolocation:GetGeolocationService,
            private tokenService: TokenService ){}

  ngOnInit(): void {
    this.user = this.tokenService.getUser()
    this.getCart()

    console.log(this.totalAmount)
    this.items = this.cartService.getItems();
    
  }


  Total() {
    
    this.totalAmount = 0
    this.totalAmount = this.cartItems1.reduce((total:any, item:any) => total + (item.productId.price * item.quantity), 0)
    console.log(this.totalAmount)
    this.cartService.cartTotal.next(this.totalAmount);
    localStorage.setItem('TotalAmount', JSON.stringify(this.totalAmount))

  }

  foundProperty:boolean = true

  GetAccuratePropertyGeolocation(){ 
    if(this.address.trim()){
      this.propertyGeolocation.GetAddressGeolocation(this.address)
      .pipe(finalize(() => {
        // This will execute after a response is gotten whether an error or success. right place to hide a loader
      })).subscribe({
        next: (data) => {
          if(data){
            this.address = data.formatted_address
            this.coordinates = data.geometry.location
            this.ButtonText = "PROCEED TO CHECKOUT";
    
            // setTimeout(()=>{
              this.foundProperty = false
            // }, 2000)
            
          }
        },
        error: (error) => {
          this.ButtonText = "CHECK ADDRESS";
          alert("We've encounter an error: " + error)
          console.error(error)

        }
      });
      
    }
    
  }

  removeProduct(item:any,e:Event) {
    // const userId = "66865064ad57296a97884bc3"
    const user = this.tokenService.getUser()
    console.log(user)
    this.cartService.removeFromCart(user.id,item._id).subscribe({
      next: (res)=>{
        console.log(res)
        this.getCart()
        this.cartService.updateCArt(-item.quantity)
      },
      error: (err)=>{
        console.error("",err)
      }
    })

    this.Total();
  }

  qntUpdate($event: any) {
    this.Total();
  }

  incre(qty: any, index: number){
    const user = this.tokenService.getUser()
    qty++
    this.cartItems1[index].quantity = qty
    this.cartItems1

    this.cartService.addtoCart({productId: this.cartItems1[index].productId._id , quantity: 1, id: user.id }).subscribe({
      next: (res)=>{
        console.log(res)
        this.cartService.updateCArt(1)
        
            }, error:(err)=>{
        console.error("here",err)
      }
    })


    // this.items[index].quantity = qty
    // this.items.length
    // this.cartService.cartItemcount.next(this.cartService.cartItemcount.value + 1)
    //this.cartService.cartTotal.next(this.cartService.cartTotal.value + this.totalAmount)
    this.cartItems1
    this.Total()
  }
  decr(qty: any, index: number){
    const user = this.tokenService.getUser()

    if(qty > 1){
    qty--
    this.cartItems1[index].quantity = qty

    this.cartService.addtoCart({productId: this.cartItems1[index].productId._id , quantity: -1, id: user.id }).subscribe({
      next: (res)=>{
        console.log(res)
        this.cartService.updateCArt(-1)
        
            }, error:(err)=>{
        console.error("here",err)
      }
    })


    // this.items[index].quantity = qty
    // this.items.length;
    // this.cartService.cartItemcount.next(this.cartService.cartItemcount.value - 1)
    //this.cartService.cartTotal.next(this.cartService.cartTotal.value - this.totalAmount)

    this.Total();
    }

  }

  getCart(){

    const user = this.tokenService.getUser()
    console.log(user.id)
    this.cartService.getCart(user.id).subscribe({
      next: (res: any) => {
          this.cartItems1 = res[0].items
          this.fullCart = res[0]
        console.log(res) 
        this.Total()
      },
      error: (err: any) => {
        console.error("An error occurred while fetching product:", err);
      }
    })
    
  }

  showAddress(){
    this.isHidden = true;
  }

  hide(){
    this.isHidden = false
  }

  placeOrder(){

    console.log(this.cartItems1)
    if(this.ButtonText == "CHECK ADDRESS"){
      this.GetAccuratePropertyGeolocation()
    }
    else if(this.ButtonText == "PROCEED TO CHECKOUT"){
      const uid = this.user.id
      
    this.fullCart._id
    this.orderService.addOrder({userId: uid, cartId:this.fullCart._id, address: {delA:this.address, cod:this.coordinates}}).subscribe(
      {
        next: (res)=>{
          console.log(res)
          this.isSuccesful = true
          this.message = res.message
          localStorage.setItem('cart_id', JSON.stringify(this.fullCart._id))
          setTimeout(()=>{
            this.router.navigateByUrl("/checkout")
          },3000)
          

        },
        error: (err)=>{
          console.log("err here", err)
        }
      }
    )
    }
    
  }


  addToCart(item: Product): void {
    const user = this.tokenService.getUser()
    this.cartService.addtoCart({productId: item.id, quantity: 1, id: user.id }).subscribe({
      next: (res)=>{
        console.log(res)
        this.cartService.updateCArt(1)
            }, error:(err)=>{
        console.error("here",err)
      }
    })

  }

}
