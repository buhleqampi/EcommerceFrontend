import { Component, OnInit} from '@angular/core';
import { TokenService } from '../../../service/token.service';
import { UserService } from '../../../services/user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  avatarUrl: string; 
  bio: string; 
  location: string; 
  website: string; 
  socialLinks: {
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  }
}




@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.css'
})

export class UserprofileComponent implements OnInit {
  imagePreview: any;
  user:any 
  myForm!:FormGroup;
  userForm!: FormGroup
  is_Error!: boolean;
  submitted= false;
  success = "none"
  onError = "none"
  userProf=""

  fname: FormControl = new FormControl("" )
  lname: FormControl = new FormControl("")
  username: FormControl = new FormControl("" )
  email: FormControl = new FormControl("" )
  contact_num: FormControl = new FormControl("",[Validators.required, Validators.minLength(2)] )
  address: FormControl = new FormControl("")
  password: FormControl = new FormControl("")

  selectedFile!: File;
  reader!: FileReader;

  constructor(private tokenService: TokenService, private userService :  UserService, private fb: FormBuilder){
    
    
  }
  

      
  ngOnInit(): void {
    this.myForm =this.fb.group({
      fname: [''],
      lname: ['',[Validators.required, Validators.minLength(2)]],
      username: ['',[Validators.required, Validators.minLength(2)]],
      email: ['',[Validators.required, Validators.email]],
      contact_num: ['',[ Validators.required, Validators.minLength(2)]],
      address: ['',[Validators.required, Validators.minLength(2)]],
      password: [''],
      imgPreview: [''],
      img: ['']
    });
    this.myForm
    this.getAllUser()
    this.getUser()
    this.newFunction()
  }


  getUser(){
    const user = this.tokenService.getUser()
    console.log(user)
    this.userService.getUser(user.id).subscribe({
      next:(data)=>{
        console.log(data)
        this.user= data.user
        this.tokenService.getRegUser(this.user)
      }, error: (err)=>{
        console.error(err)
      }
    })

    

  }

  getAllUser(){
   
    this.userService.getAllUsers().subscribe({
      next:(data)=>{
        console.log(data.user)
        
      }, error: (err)=>{
        console.error(err)
      }
    })

    

  }


  newFunction(){
    const formData:any = new FormData();
    formData.append('name', 'John Doe');
    formData.append('email', 'johndoe@example.com');

    for(var key of formData.entries()) {
      console.log("sdsds", key[0] + ', ' + key[1]);
  }
  var obj :any = {}

  for (let x of formData){
    
    let key = x[0]
    let value = x[1]
    obj[key as keyof typeof obj] = value
    
 }

  console.log(obj)

}

  updateUser(){
    const user_id = this.user.id
  
    const formData: any = new FormData();
    formData.append('fname', this.myForm.get('fname')?.value)
    formData.append('lname', this.myForm.get('lname')?.value)
    formData.append('email', this.myForm.get('email')?.value)
    formData.append('username', this.myForm.get('username')?.value)
    formData.append('contact_num', this.myForm.get('contact_num')?.value)
    formData.append('img', this.imagePreview)
    
  //   for(var key of formData.entries()) {
  //     console.log("sdsds", key[0] + ', ' + key[1]);
  // }


    var obj :any = {}

    for (let x of formData){
      
      let key = x[0]
      let value = x[1]
      obj[key as keyof typeof obj] = value
     
   }

    console.log(obj)

    this.userService.update(user_id, obj ).subscribe({
      next: (data)=>{
        console.log(data)
        this.submitted = true

        setTimeout(()=>{
          this.submitted = false
        },4000)
      },
      error: (err)=>{
        this.is_Error = true;
        console.log("Error message goes like this:", err.error, err)
        setTimeout(()=>{
          this.is_Error = false
        },4000)
      }
    })

    // setTimeout(()=>{
    //   this.submitted = false
    // },4000)

  }

  // fileSelect(event: any){
 
  //   if (event.target.files[0]) {
     
  //     var reader = new FileReader();
      
  //     reader.readAsDataURL(event.target.files[0]); 

  //     reader.onload = (event:any) => {
  //       this.imagePreview = event.target.result;
  //       console.log(this.imagePreview)

  //       this.myForm.patchValue({
  //       img: this.imagePreview
  //     });
  //     console.log(this.myForm.value)
  //     console.log(this.myForm.get('img'))
  //     this.myForm.get('img').updateValueAndValidity()
       
  //     }
  //   }
  // }

  fileSelect(event: any) {
    if (event.target.files[0]) {
      this.selectedFile = event.target.files[0];
      this.reader = new FileReader();
      this.reader.readAsDataURL(this.selectedFile);

      this.reader.onload = (event: any) => {
        this.imagePreview = event.target.result;
        console.log(this.imagePreview)

        
      };

      this.myForm.patchValue({
        img: this.selectedFile
      });
      
    }
  }

  clearinputs(){
    this.myForm.reset()
  }
}
