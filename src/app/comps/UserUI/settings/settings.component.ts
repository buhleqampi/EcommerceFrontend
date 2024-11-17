import { Component } from '@angular/core';

interface Setting {
  name: string;
  value: string | boolean; // Can be string or boolean based on setting type
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {

  constructor() { }

  ngOnInit(): void {
  }
}
