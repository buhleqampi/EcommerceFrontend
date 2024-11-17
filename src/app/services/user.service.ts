import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  headers = new HttpHeaders()
  // .append('content-type', 'application/json')
  .append('Accept', '/')

  user_API = "https://shukuma.shaper.co.za/v1/users"
  constructor(private http: HttpClient) { }

  getUser(id: any):Observable<any>{
    return this.http.get<any>(`${this.user_API}/user/${id}`);
  }

  getAllUsers():Observable<any>{
    return this.http.get<any>(`${this.user_API}/all`);
  }

  update(id: any, payload: any):Observable<any> {
    return this.http.put<any>(`${this.user_API}/user/${id}`, payload )
  }


}
