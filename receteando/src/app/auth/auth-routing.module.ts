import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { VerifyComponent } from './verify/verify.component';

const routes: Routes = [
  {
    path:'',
    children:[
      { path:'register', component:RegisterComponent },
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
