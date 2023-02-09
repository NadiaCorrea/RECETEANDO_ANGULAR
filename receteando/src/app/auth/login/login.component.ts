import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  email:string = "";
  password:string = "";
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  @ViewChild('myForm') myForm !: NgForm;

  constructor() { 
  }

  ngOnInit(): void {
  }

  //method that validates that the fields meet the requirements 
  notValidField(field:string):boolean {
    return this.myForm?.controls[field]?.invalid &&
    this.myForm?.controls[field]?.touched;
  }

  //Una vez se hayan enviado los parámetros
  login(){
    console.log('enviado');    
  }

}
