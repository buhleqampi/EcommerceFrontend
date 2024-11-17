import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../../services/orders/orders.service';
import { Favorites } from '../../../interfaces/favorites';
import { FavoritesService } from '../../../services/favorites/favorites.service';
import { CartService } from '../../../services/cart-service/cart.service';
import { Location } from '@angular/common';
import { Product } from '../../../interfaces/product';
import { Router } from '@angular/router';
import { TokenService } from '../../../service/token.service';
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css'
})
export class FavouritesComponent {
  
  favorites: Favorites[] = [];
  error: string | null = null;
  item: any[] = [];
  itemId:any;
  user: any;

  constructor( private favoritesService: FavoritesService, 
    private location: Location, 
    private router: Router, 
    private tokenService: TokenService, private userService :  UserService, private cartService: CartService) {}

  ngOnInit(): void {
    this.getUser()
    

  } 

async  getUser(){
    const user = await this.tokenService.getUser()
    console.log(user)
    this.userService.getUser(user.id).subscribe({
      next:(data)=>{
        console.log(data)
        this.user= data.user
        this.getAllfavorites()
      }, error: (err)=>{
        console.error(err)
      }
    })
  }

  getAllfavorites(){

    this.favoritesService.fetchFavs(this.user.id).subscribe({
      next: (data: any) =>{

        this.favorites = data;
        
      console.log('Data received from getAllfavorites:', this.favorites); // Log the entire response object
        
      },
      error: (err: any) => {
        console.error('Error fetching favorites:', err);
      }
    })
  }

  confirmDelete(id: any) {
    this.favoritesService.deleteItem(id).subscribe({
      next: (response: any) => {
        console.log(response)
        this.cartService.updateFavCount(-1)
        this.getAllfavorites()
      },
      error: (err)=>{
        console.error(err)
      }
     
    });
  }
}

// getCart(){

//   const id = "66865064ad57296a97884bc3"
//   this.cartService.getCart(id).subscribe({
//     next: (res: any) => {
//         this.cartItems1 = res[0].items
//         this.fullCart = res[0]
//       console.log(res[0].id) 
//       this.Total()
//     },
//     error: (err: any) => {
//       console.error("An error occurred while fetching product:", err);
//     }
//   })
  
// }