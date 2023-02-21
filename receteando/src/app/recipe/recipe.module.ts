import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeRoutingModule } from './recipe-routing.module';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeStepsComponent } from './recipe-steps/recipe-steps.component';
import { RecipeIngredientsComponent } from './recipe-ingredients/recipe-ingredients.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeDetailsComponent,
    RecipeStepsComponent,
    RecipeIngredientsComponent,
    AddRecipeComponent
  ],
  imports: [
    CommonModule,
    RecipeRoutingModule,
    RouterModule,
    SharedModule
  ]
})
export class RecipeModule { }
