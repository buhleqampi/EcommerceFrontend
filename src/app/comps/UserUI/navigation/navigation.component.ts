import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart-service/cart.service';
import { Location } from '@angular/common';
import { TokenService } from '../../../service/token.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent implements OnInit {
  isNavbarOpen = false;
  collapsed = false;
  likes :any
  user:any

  constructor(private router: Router,  private userService: UserService, private location: Location, private tokenService: TokenService ) {}


  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
    this.collapsed = this.isNavbarOpen;
  }


  closeNavbar() {
    this.isNavbarOpen = false;
  }
  ngOnInit(): void {
    this.getUser()
  }
  
  goBack() {
    this.location.back();
  }
  getUser(){
    const user = this.tokenService.getUser()
    console.log(user)
    this.userService.getUser(user.id).subscribe({
      next:(data)=>{
        console.log(data.user.img)
        this.user= data.user

        this.tokenService.getRegUser(this.user)
      }, error: (err)=>{
        console.error(err)
      }
    })

    

  }
}

