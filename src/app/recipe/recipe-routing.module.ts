import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    children:[
      {path:'', component:RecipeListComponent},
      {path:'add', component:AddRecipeComponent},
      {path: ':id', component:RecipeDetailsComponent},
      {path:'**', redirectTo:'recipe'}
      
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
    ]
})
export class RecipeRoutingModule { }
