import { Component } from '@angular/core';

@Component({
  selector: 'app-driver-profile',
  templateUrl: './driver-profile.component.html',
  styleUrl: './driver-profile.component.css'
})
export class DriverProfileComponent {

  Editable:boolean = false;

  DeleteProfile(){
    confirm("Leaving us so soon?")
  }

  EditProfile(){
    this.Editable = true;

  }

}
