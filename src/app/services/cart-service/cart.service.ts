import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Product } from '../../interfaces/product';
import { CartItem } from '../../interfaces/cartItem';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})

export class CartService {
  cartItemcount = new BehaviorSubject<number>(0);
  favList = new BehaviorSubject<number>(0);
  cartTotal = new BehaviorSubject<number>(0);
  wishList: Product[] = [];
  items: CartItem[] = [];
  totalAmount = 0;

 

  private baseUrl: string = "https://shukuma.shaper.co.za/v1/cart/";
  private likesUrl: string = "https://shukuma.shaper.co.za/v1/favourites/"
  

  constructor(private _http: HttpClient) {}

  getCart(id: any): Observable<any> {
    return this._http.get<any>(`${this.baseUrl}`, id);
  }

  addtoCart(payload: any ):Observable<any>{
    return this._http.post<any>(`${this.baseUrl}add/`, payload  )
  } 
  
  addToWishlist(payload: any):Observable<any> {
    return this._http.post<any>(`${this.likesUrl}`, payload)
  }

  fetchFavs(id: any):Observable<any> {
    return this._http.get<any>(`${this.likesUrl}`, id)
  }

  removeFromCart(userId:any, productId: any ): Observable<any>{
    return this._http.delete<any>(`${this.baseUrl}one?userId=${userId}&productId=${productId}`, )
  }

  getTotal() {
    this.totalAmount = 0;
    this.items.forEach((item: CartItem) => {
      this.totalAmount += item.price * item.quantity;
      localStorage.setItem('Total', JSON.stringify(this.totalAmount));
    });

    this.cartTotal.next(this.totalAmount);
    localStorage.setItem('cartItems', JSON.stringify(this.items));
  }

  getItems(): CartItem[] {
    return this.items;
  }

  getWishilist(): Product[] {
    return this.wishList;
  }

  updateCArt(newCount: number){
    this.cartItemcount.next(this.cartItemcount.value + newCount);
    console.log(this.cartItemcount.value)
  }

  updateFavCount(newCount: number){
    this.favList.next(this.favList.value + newCount);
    console.log(this.favList.value)
  }
  
  getcartCount(){
    return this.cartItemcount
  }
  


  

  
}
