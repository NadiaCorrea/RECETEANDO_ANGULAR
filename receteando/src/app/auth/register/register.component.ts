import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

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

  constructor(private fb:FormBuilder) { 

   

  }

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

}
