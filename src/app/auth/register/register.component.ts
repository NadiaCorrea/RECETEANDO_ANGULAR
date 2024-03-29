import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})

export class RegisterComponent implements OnInit {
  myForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
    email:  [ '', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(3)]],
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
    }, {Validators:[this.passwordValidator()]});

  constructor(private fb:FormBuilder, private userService: UserService, private router:Router) { }

  ngOnInit(): void {

   }

  notValidField(campo:string){
    return this.myForm.controls[campo].errors &&
    this.myForm.controls[campo].touched
  }

  public passwordValidator(): ValidationErrors|null {
    return (formGroup: FormGroup) => {
      const pass:string = formGroup.get('password')?.value;
      const repeat_pass: string = formGroup.get('confirmPassword')?.value;

      if(pass !== repeat_pass) return {isValid:false};
      return null;
    }
  };

  notSame():boolean{
    const pass: string = this.myForm.get('password')?.value;
    const rePass : string = this.myForm.get('confirmPassword')?.value;

    if (pass !== rePass){
      return true;
    }else{
      return false;
    }
  }

  register(){

   const newUser : User = {
    username:this.myForm.get('username')?.value, 
    email:this.myForm.get('email')?.value, 
    name:this.myForm.get('name')?.value,
    password:this.myForm.get('password')?.value
  }

  this.userService.addUser(newUser).subscribe({
    next:(resp) =>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Tu cuenta ha sido creada. Por favor, revisa tu correo para verificar tu cuenta',
        showConfirmButton: true,
        confirmButtonColor: '#476E61',
        timer: 3500
      });
      this.router.navigate(['/']);
    },
    error:(error) =>{
      Swal.fire({
        title: 'Ha acurrido un error',
        text: `${error.error.message}`,
        icon: 'error',
        confirmButtonColor: '#476E61'
      });
    }

  });
  }

}
