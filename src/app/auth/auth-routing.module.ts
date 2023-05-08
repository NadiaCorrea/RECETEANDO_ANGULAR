import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { VerifyComponent } from './verify/verify.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path:'',
    children:[
      { path:'register', component:RegisterComponent},
      { path:'login', component:LoginComponent},
      { path:'verify', component:VerifyComponent},
      {path:'**', redirectTo:'login'}
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
    ]
})
export class AuthRoutingModule { }
