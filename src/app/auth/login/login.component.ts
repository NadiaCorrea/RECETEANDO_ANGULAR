import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import  Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  email:string = "";
  password:string = "";
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  @ViewChild('myForm') myForm !: NgForm;

  constructor(private authService:AuthenticationService, private router:Router, private showingElements:SearchService, private userServ:UserService) { 
  }

  ngOnInit(): void {
    this.showingElements.hide();
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
      next:(resp:any) =>{
        localStorage.setItem('authenticated', 'true');
        localStorage.setItem('token', resp.token);
        this.userServ.getLoggedUser().subscribe({
          next: (resp) => {
            localStorage.setItem('loggedUser', JSON.stringify(resp));
            this.router.navigate(['/recipe']);
          }, error: (error) => {
            localStorage.setItem('authenticated', 'false');
            localStorage.setItem('loggedUser', '');
            Swal.fire({
              title: 'Error!',
              text: 'Credenciales incorrectas.',
              icon: 'error'
            });
            this.router.navigate(['/auth/login']);
          }});
      },
      error:(error) =>{
        localStorage.setItem('authenticated', 'false');
        localStorage.setItem('loggedUser', '');
        Swal.fire({
          title: 'Error!',
          text: 'Credenciales incorrectas.',
          icon: 'error'
        });
        this.router.navigate(['/auth/login']);
      }
    }) 
  }


}
