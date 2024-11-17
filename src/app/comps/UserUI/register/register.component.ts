import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { min } from 'rxjs';
import { validate } from 'uuid';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  isSuccessful = false
  isSignUpFailed = false
  errorMessage = ''
  registerForm : FormGroup
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  successMessage=""


  constructor(private _auth: AuthService, private _router: Router, private fb : FormBuilder, private router: Router,) {
    this.registerForm = this.fb.group({
      username: new FormControl ('', [Validators.required, Validators.minLength(6)]),
      email: new FormControl ('', [Validators.required, Validators.email,Validators.pattern(this.emailPattern)]),
      password: new FormControl ('', [Validators.required, Validators.minLength(6)]),
      confirm_password: ['', [Validators.required,Validators.minLength(6), this.comparePasswords]]
      })
  }

  ngOnInit(): void {
  }

  comparePasswords(control: AbstractControl){

    if (control.get("password")?.value  !== control.get("password")?.value) {
      console.log("mojo")
      return { passwordsDontMatch: true };
    }
    return null;
  }
  

  onSignUp(){
    
    if (this.registerForm.invalid) {
      return; // Prevent submission if form is invalid
    }

    this._auth.registerUser(this.registerForm.value).subscribe({
      next: (res)=> {
          console.log(res)
          this.isSuccessful = true
          this.successMessage = "Registered successfully!"
           setTimeout(()=>{
          this.router.navigate(['/login'])
        }, 3000)
      
      }, error: (err)=>{
          this.isSignUpFailed = true
          this.errorMessage = `Signup Failed!. ${err.error.message}`
          console.error(err)
      }
    })
  }

}
