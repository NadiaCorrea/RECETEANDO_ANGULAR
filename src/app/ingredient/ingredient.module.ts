import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';

import { IngredientRoutingModule } from './ingredient-routing.module';
import { IngredientEditComponent } from './ingredient-edit/ingredient-edit.component';
import { IngredientAddComponent } from './ingredient-add/ingredient-add.component';
import { IngredientListComponent } from './ingredient-list/ingredient-list.component';


@NgModule({
  declarations: [
    IngredientEditComponent,
    IngredientAddComponent,
    IngredientListComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    RouterModule,
    MatTableModule, 
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatDialogModule,
    IngredientRoutingModule
  ]
})
export class IngredientModule { }
