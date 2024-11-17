import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenService } from '../../service/token.service';
import { UserRegister } from '../../interfaces/userRegister';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-user-ui',
  templateUrl: './user-ui.component.html',
  styleUrl: './user-ui.component.css'
})
export class UserUIComponent implements OnInit {
  submitted= false;
  success = "none"
  isSuccessful=false
  errorMessage = ""
  registerForm:FormGroup
  minStartDate = new Date().toJSON().slice(0,10)
  is_Error!: boolean;

  selectedFile!: File;
  reader!: FileReader;
  imagePreview: any;
  user:any
  constructor(private formBuilder: FormBuilder, private token: TokenService, private userService: UserService ){

    this.registerForm =this.formBuilder.group({
      fname: ['',[Validators.required ,Validators.minLength(3)]],
      lname: ['',[Validators.required, Validators.minLength(3)]],
      username: ['',[Validators.required, Validators.minLength(4)]],
      address: [null,[Validators.required, Validators.minLength(2)]],
      contact_no: ['', [Validators.required, Validators.max(10)]],
      img: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.minLength(2)]],
      
      
      
    });
  }

  ngOnInit(): void {
    this.getUser()
  }

  onSubmit() {
    const formData: any = new FormData();

      
      formData.append('imgUrl',this.selectedFile)
      //formData.append()

      console.log(this.registerForm.value)
      


  
      this.userService.update(this.user.id, formData).subscribe({
        next: response  => {
          console.log('User updated successfully', response);
          // this.registerForm.reset();
        },
        error: error => {
          console.error('Error adding product',formData, error);
         }
     });
     }
  


  fileSelect(event: any) {
    if (event.target.files[0]) {
      this.selectedFile = event.target.files[0];

      this.reader = new FileReader();
      this.reader.readAsDataURL(this.selectedFile);

      this.reader.onload = (event: any) => {
        this.imagePreview = event.target.result;
        console.log(this.imagePreview)
        
      };

      
    }
  }

  getRegUser(){
    this.user = this.token.reg_user
    console.log(this.user)
  }

  getUser(){
    const user = this.token.getUser()
    console.log(user)
    this.userService.getUser(user.id).subscribe({
      next:(data)=>{
        console.log(data)
        this.user= data.user
        this.registerForm.get('email')?.patchValue(this.user.email)
        this.registerForm.get('username')?.patchValue(this.user.username)
        
        // this.tokenService.getRegUser(this.user)
      }, error: (err)=>{
        console.error(err)
      }
    })

    

  }

}
