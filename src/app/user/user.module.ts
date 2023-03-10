import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { UserRoutingModule } from './user-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';

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
    UserRoutingModule, 
    MatTableModule, 
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule
  ]
})
export class UserModule { }
