import { CategoryListComponent } from './category-list/category-list.component';
import { AdminGuardService } from '../services/admin-guard.service';
import { CategoryAddComponent } from './category-add/category-add.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path:'',
    children:[
      { path:'list', component:CategoryListComponent, canActivate: [AdminGuardService]},
      { path:'add', component:CategoryAddComponent, canActivate: [AdminGuardService]},
      { path:'edit', component:CategoryEditComponent, canActivate: [AdminGuardService]}

    ]
  }


];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
})
export class CategoryRoutingModule { }
