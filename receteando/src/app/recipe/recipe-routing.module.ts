import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeListComponent } from './recipe-list/recipe-list.component';

const routes: Routes = [
  {
    path:'',
    children:[
      { path:'recipe', component:RecipeListComponent },
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
