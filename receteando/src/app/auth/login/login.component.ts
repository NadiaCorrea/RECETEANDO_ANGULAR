import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import  Swal from 'sweetalert2';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  email:string = "";
  password:string = "";
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  @ViewChild('myForm') myForm !: NgForm;

  constructor(private authService:AuthenticationService) { 
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
    this.authService.login(this.email, this.password)
    .subscribe({
      next:(resp) =>{
        console.log(resp);
        localStorage.setItem('token', JSON.stringify(resp));

      },
      error:(error) =>{
        Swal.fire({
          title: 'Error!',
          text: 'Credenciales incorrectas.',
          icon: 'error'
        });


      }
    }) 
  }


}
