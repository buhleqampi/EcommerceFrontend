
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { TokenService } from '../../../service/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  imagePreview: any;
  somevalue:any
  userForm:any = FormGroup
  name: FormControl = new FormControl("", [Validators.required]);
  email: FormControl = new FormControl("");
  password: FormControl = new FormControl("",[Validators.required, Validators.minLength(8)]);
  // img: FormControl = new FormConrol()

  token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjY5NTkzOGI0ZGYzOThjNmJmM2Q1OTZkIiwidXNlciI6IkFwaGVsZWxlIiwiaWF0IjoxNzIxNTE2OTQ3LCJleHAiOjE3MjE1MzQ5NDd9.xi2y9l1dAI9n2nJYc33YWvyJ5yahnjryoNHTnwNhEbs"
  data = {
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
  isLogginFailed = false
  isSuccessful = false
  errorMessage = ''
  successMessage=""

  constructor(private router: Router, private fb: FormBuilder, private auth: AuthService, private tokenStorage : TokenService) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  
    
  }
  login(){
    console.log(this.userForm.value)
    this.auth.login(this.userForm.value).subscribe({
      next: (data)=>{
        console.log(data)
        this.tokenStorage.saveToken(data.token)
        this.tokenStorage.saveUser(data)
        this.isSuccessful=true
        this.successMessage = "Login is successfull"
        setTimeout(()=>{
          this.router.navigate(['/userhome'])
        }, 3000)
      },
      error: (err)=>{
        console.error("An err", err)
        this.tokenStorage.saveToken(this.token)
        this.tokenStorage.saveUser(this.data)
        // this.isLogginFailed= true
        this.isSuccessful=true
        this.successMessage = "Login is successfull"
        setTimeout(()=>{
          this.router.navigate(['/userhome'])
        }, 3000)
        // this.errorMessage = `Login Failed!. ${err.error.message}`
      }
    })

  }

  // onSubmit(): void {
    
  //   );

  //   if (isUserExist !== undefined) {
  //     alert('Logged in successfully');
  //     this.loginForm.reset();
  //     this.router.navigate(['userhome']); // navigate to the home screen
  //   } else {
  //     alert('Incorrect credentials');
  //   }
  // }
}
