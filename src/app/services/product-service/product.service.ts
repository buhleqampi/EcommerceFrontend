import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../../interfaces/product';
import { ProductDbResponse } from '../../interfaces/productDbResponse';

@Injectable({
  providedIn: 'root',
  })
  export class ProductService {
  private baseUrl: string = "https://shukuma.shaper.co.za/v1/products";


  constructor(private _http: HttpClient) {}

  getAllProducts(): Observable<ProductDbResponse> {
    return this._http.get<ProductDbResponse>(`${this.baseUrl}/articles`);
  }

  getProduct(id: string | null): Observable<Product> {
    return this._http.get<Product>(`${this.baseUrl}/article/${id}`);
  }

  createProduct(formData: any): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this._http.post<Product>(`${this.baseUrl}/articles`, formData, {headers});
  }

  deleteProduct(id: string) : Observable<Product> {
    return this._http.delete<Product>(`${this.baseUrl}/articles/${id}`)
  }

  deleteAllProducts() : Observable<Product> {
    return this._http.delete<Product>(`${this.baseUrl}/articles`)
  }

  updateAProduct(id: string, data: FormData) : Observable<Product> {
    return this._http.put<Product>(`${this.baseUrl}/article/${id}`, data)
  }
  }
