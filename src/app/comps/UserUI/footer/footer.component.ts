import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart-service/cart.service';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '../../../services/user.service';
import { TokenService } from '../../../service/token.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  favListCount$ = new BehaviorSubject<number>(0);
  cartCount$ = new BehaviorSubject<number>(0)
  favsCount : any;
  cartCounter: any;
  cartCount: number = 0;
  @Input() some : any
  user: any;



    constructor(private cartService: CartService, private tokenService: TokenService, private userService :  UserService,) { }
    isEmpty=true

    fcolor= '#e01219'

    ngOnInit(): void {
      this.favListCount$ = this.cartService.favList
      this.cartCount$ = this.cartService.cartItemcount
      this.getUser()
      
    }

    
  fetchFavs(user:any){
    
    this.cartService.fetchFavs(user.id).subscribe({
      next: (res: any) => {
          this.favsCount = res.length

      },
      error: (err: any) => {
        console.error("An error occurred while fetching product:", err);
      }
    })
  }

  getCart(user: any){
    
    this.cartService.getCart(user.id).subscribe({
      next: (res: any) => {
        console.log(res.length)
      },
      error: (err: any) => {
        console.error("An error occurred while fetching product:", err);
      }
    })
    
  }

  async  getUser(){
    const user = await this.tokenService.getUser()
    console.log(user)
    this.userService.getUser(user.id).subscribe({
      next:(data)=>{
        console.log(data)
        this.user= data.user

        this.fetchFavs(this.user)
        this.getCart(this.user)
        
      }, error: (err)=>{
        console.error(err)
      }
    })
  }

}
