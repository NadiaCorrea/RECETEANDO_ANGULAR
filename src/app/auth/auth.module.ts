import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { VerifyComponent } from './verify/verify.component';
import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';





@NgModule({
  declarations: [
    LoginComponent,
    VerifyComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    RouterModule
  ]
})
export class AuthModule { }
