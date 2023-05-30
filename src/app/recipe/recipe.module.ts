import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeRoutingModule } from './recipe-routing.module';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { NgModule } from '@angular/core';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeDetailsComponent,
    AddRecipeComponent
  ],
  imports:[
    CommonModule,
    FormsModule, 
    RouterModule,
    SharedModule, 
    ReactiveFormsModule,
    RecipeRoutingModule, 
    AutoCompleteModule,
    MultiSelectModule
  ]
})

export class RecipeModule { }
