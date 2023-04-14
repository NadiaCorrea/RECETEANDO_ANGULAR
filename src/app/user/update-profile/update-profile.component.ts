import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.interface';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html'
})
export class UpdateProfileComponent implements OnInit {

  user:User = {
    userId: 0,
    username: '',
    email:'',
    name:''
  }

  @ViewChild('myForm') myForm !: NgForm;

  constructor(private userSer: UserService, private router:Router) { }

  ngOnInit(): void {
    this.userSer.getLoggedUser().subscribe({
      next:(resp)=>{
        this.user = resp;
      }, 
      error:(error)=>{
        Swal.fire({
          title: 'Error!',
          text: 'Ha ocurrido un error inesperado vuleva a intentarlo más tarde.',
          icon: 'error'
        });
      }
    })
  }

  notValidField(field:string):boolean {
    return this.myForm?.controls[field]?.invalid &&
    this.myForm?.controls[field]?.touched;
  }


  update(){
    this.userSer.updateProfile(this.user.name).subscribe({
      next:(resp) =>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Su perfil ha sido modificado.',
          showConfirmButton: true,
          timer: 3500
        });
        this.router.navigateByUrl('/recipe');
      }, 
      error:(error)=>{
        Swal.fire({
          title: 'Error!',
          text: `${error.error.message}`,
          icon: 'error'
        });
      }
    })


  }



}
