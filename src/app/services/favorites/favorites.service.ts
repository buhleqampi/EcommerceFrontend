import { Injectable } from '@angular/core';
import { Favorites } from '../../interfaces/favorites';
import { ProductDbResponse } from '../../interfaces/productDbResponse';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Order } from '../../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private baseUrl = "https://shukuma.shaper.co.za/v1/favourites";   
  favorites: Favorites[] = [];
  error: string | null = null;

  constructor( private http:HttpClient) { }
  
  fetchFavs(id: any):Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`, id)
  }

  deleteItem(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
