import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ProductDbResponse } from '../../interfaces/productDbResponse';
import { Order } from '../../interfaces/order';



// Add other relevant order properties (e.g., items, total, status)
@Injectable({
  providedIn: 'root'
})
export class OrdersService {

    private baseUrl = "https://shukuma.shaper.co.za/v1/orders";   
    orders: Order[] = [];
    error: string | null = null;
  constructor( private http:HttpClient) { }


  // getAllOrders(): Observable<Order[]> {
  //   return this.http.get<Order[]>(this.baseUrl)
  //     .pipe(
  //       map(response => response as Order[]),
  //     );
  //   }
    
  getAllDriverOrders(driverId:any): Observable<ProductDbResponse> {
    return this.http.get<ProductDbResponse>(`${this.baseUrl}/driver/${driverId}`);
  }

  getAllOrders(): Observable<ProductDbResponse> {
    return this.http.get<ProductDbResponse>(`${this.baseUrl}`);
  }

  addOrder(payload: any):Observable<any>{
    const headers = new HttpHeaders()
    // .append('content-type', 'application/json')
    .append('Accept', '/')
    return this.http.post<any>(`${this.baseUrl}`, payload, {headers})
  }

  fetchOrder(userId:any):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/${userId}`)
  }

  fetchAnOrder(card_id:any):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/one/${card_id}`)
  }
  updateOrder(orderId: any, updatedOrderData:any): Observable<any> {
    const url = `${this.baseUrl}/update/${orderId}`;
    return this.http.put<any>(url, updatedOrderData);
  }

  private handleError(error: any): Observable<any> {
    console.error('Error updating order:', error);
    return throwError('Error updating order. Please try again.');
  }

   orderData = new BehaviorSubject<any>({});
  mPassOrder(order:Order){
    this.orderData = new BehaviorSubject<any>({});
    this.orderData.next(order);
  }

  mGetPassOrder():Observable<any>{
    return this.orderData
  }


  createOrder(orderData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/`, orderData);
  }
}
