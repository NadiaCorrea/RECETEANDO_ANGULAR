import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import { ChangePassword } from '../../interfaces/changePassword.interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html'
})
export class UpdatePasswordComponent implements OnInit {
  
  oldPassword:string = '';
  newPassword:string = '';

  @ViewChild('myForm') myForm !: NgForm;

  constructor(private userServ: UserService, private router:Router) { }

  ngOnInit(): void {
  }

  notValidField(field:string):boolean {
    return this.myForm?.controls[field]?.invalid &&
    this.myForm?.controls[field]?.touched;
  }


  update(){
    const changePass : ChangePassword =  {
      oldPassword: this.oldPassword,
      newPassword: this.newPassword
    }

    this.userServ.updatePassword(changePass).subscribe({
      next:(resp) =>{
        console.log(resp)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Su contraseña ha sido modificada.',
          showConfirmButton: true,
          timer: 3500
        });
        this.router.navigateByUrl('/recipe');
      }, 
      error:(error) =>{
        Swal.fire({
          title: 'Error!',
          text: `${error.error.message}`,
          icon: 'error'
        });
      }
      });

  }
}
