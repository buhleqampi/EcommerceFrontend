import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent implements OnInit {
  isSuccessful = false
  isSignUpFailed = false
  errorMessage = ''
  user: any
  roles = ['user', 'admin']
  bui!  : string | null

  registerForm: FormGroup

  constructor(private auth: AuthService, private router: Router) {
    this.registerForm = new FormGroup({
      fname: new FormControl(""),
      lname: new FormControl(""),
      username: new FormControl(""),
      email: new FormControl(""),
      tel_no: new FormControl(""),
      address: new FormControl(""),
      password: new FormControl(""),
      roles: new FormControl(""),
      role: new FormControl(""),
      business: new FormControl("") 
      
    });
   }

  ngOnInit(): void {

    this.bui = `${localStorage.getItem('BI')}`
    console.log(this.bui)
  }

 
  
  onSignUp() {
    this.updateRoles()

    console.log((this.registerForm.value))

    if (this.registerForm.invalid) {
      return; 
    }

  this.registerForm.get('business')?.setValue(this.bui)

  this.auth.registerUser(this.registerForm.value).subscribe({
    next: (res)=> {
      this.isSuccessful = true
        this.errorMessage = "Registration is successfull!"
        console.log(res)
        // setTimeout(()=>{
        //   this.router.navigate(['/login'])
        // }, 3000)

    }, error: (err)=>{
      console.error(err)
      this.isSuccessful = false
        this.errorMessage = "Registration is failed!"
  }
})

  }

   updateRoles(){
    const selectedRole = this.registerForm.get('role')?.value;

    if (selectedRole === 'user') {
      this.registerForm.get('roles')?.setValue(['user']);
      this.registerForm.get('role')?.setValue('user')
      
    } else {
      this.registerForm.get('roles')?.setValue(this.roles);
      this.registerForm.get('role')?.setValue('admin')
    }
      
   }

  

}
