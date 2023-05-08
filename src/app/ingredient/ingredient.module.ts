import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { IngredientRoutingModule } from './ingredient-routing.module';
import { IngredientEditComponent } from './ingredient-edit/ingredient-edit.component';
import { IngredientAddComponent } from './ingredient-add/ingredient-add.component';
import { IngredientListComponent } from './ingredient-list/ingredient-list.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    IngredientEditComponent,
    IngredientListComponent,
    IngredientAddComponent
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
    IngredientRoutingModule, 
    MatAutocompleteModule
  ]
})
export class IngredientModule { }
