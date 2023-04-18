import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngredientListComponent } from './ingredient-list/ingredient-list.component';
import { AdminGuardService } from '../services/admin-guard.service';
import { IngredientAddComponent } from './ingredient-add/ingredient-add.component';
import { IngredientEditComponent } from './ingredient-edit/ingredient-edit.component';

const routes: Routes = [
  {
    path:'',
    children:[
      { path:'list', component:IngredientListComponent, canActivate: [AdminGuardService]},
      { path:'add', component:IngredientAddComponent, canActivate: [AdminGuardService]},
      { path:'edit', component:IngredientEditComponent, canActivate: [AdminGuardService]}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IngredientRoutingModule { }
