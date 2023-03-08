import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { UserRoutingModule } from './user-routing.module';



@NgModule({
  declarations: [
    UpdatePasswordComponent,
    UpdateProfileComponent,
    UsersListComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    RouterModule,
    UserRoutingModule
  ]
})
export class UserModule { }
