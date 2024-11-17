import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {


  constructor(private route:Router) { }

  mLoginBusiness(){
    setTimeout(() => {
      this.route.navigate(["registerBusiness"]);
    }, 500)
  }

  mLoginUser(){
    setTimeout(() => {
      this.route.navigate(["register"]);
    }, 500)
  }

  mLoginDriver(){
    setTimeout(() => {
      this.route.navigate(["driver/dash"]);
    }, 500)
  }

  
}
