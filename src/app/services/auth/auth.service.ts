import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { UserRegister } from '../../interfaces/userRegister';
import { UserLogin } from '../../interfaces/userLogin';
import { Observable } from 'rxjs';
import { SignInData } from '../../interfaces/signInData';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  businessId = ''

  getId(id: any) {
    return this.businessId = id
  }


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  testUser= {
    "_id": "6695938b4df398c6bf3d596d",
    "username": "Aphelele",
    "email": "dumisanincubeni@live.co.za",
    "roles": [
        "user"
    ],
    "img": "https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg",
    "business": null,
    "createdAt": "2024-07-15T21:24:28.003Z",
    "updatedAt": "2024-07-15T21:24:28.003Z",
    "id": "6695938b4df398c6bf3d596d"
}

  registerUser(userData: UserRegister):Observable<any> {
    return this.http.post<any>('http:/localhost:3000/v1/auth/register', userData);
  }

  login(userData: UserLogin):Observable<any> {
    return this.http.post<any>('http:/localhost:3000/v1/auth/signin', userData);
  }

  registerBusiness(payload: any):Observable<any> {
    return this.http.post<any>('http:/localhost:3000/v1/business/', payload);
  }
  

  
}

