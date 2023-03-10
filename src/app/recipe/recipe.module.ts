import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeRoutingModule } from './recipe-routing.module';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';

import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeDetailsComponent,
    AddRecipeComponent
  ],
  imports: [
    CommonModule,
    RecipeRoutingModule,
    RouterModule,
    SharedModule, 
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RecipeModule { }
