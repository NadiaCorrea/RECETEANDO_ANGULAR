import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { UsersListComponent } from './users-list/users-list.component';
import { AdminGuardService } from '../services/admin-guard.service';

const routes: Routes = [
  {
    path:'',
    children:[
      { path:'password', component:UpdatePasswordComponent},
      { path:'profile', component:UpdateProfileComponent},
      { path:'list', component:UsersListComponent, canActivate: [AdminGuardService]}
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
    ]
})
export class UserRoutingModule { }
