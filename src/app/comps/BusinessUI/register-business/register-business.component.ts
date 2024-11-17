import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-register-business',
  templateUrl: './register-business.component.html',
  styleUrl: './register-business.component.css'
})
export class RegisterBusinessComponent {
  isSuccessful = false
  isSignUpFailed = false
  errorMessage = ''
  business: any

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(""),
    email: new FormControl(""),
    tel_no: new FormControl(""),
    address: new FormControl(""),
    description: new FormControl("")
  });
  constructor(private auth: AuthService, private router: Router) { }
  
  onSignUp() {
    this.auth
    console.log((this.registerForm.value))

    if (this.registerForm.invalid) {
      return; 
    }
    
  this.auth.registerBusiness(this.registerForm.value).subscribe({
    next: (res)=> {
      this.isSuccessful = true
        this.errorMessage = "Registration is successfull!"
        console.log(res)

        localStorage.setItem("BI", res.id)

        this.auth.getId(res.id)
        setTimeout(()=>{
          this.router.navigate(['/login'])
        }, 3000)

    }, error: (err)=>{
      console.error(err)
  }
})

  }
}
