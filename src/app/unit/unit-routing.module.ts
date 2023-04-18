import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuardService } from '../services/admin-guard.service';
import { UnitListComponent } from './unit-list/unit-list.component';
import { UnitAddComponent } from './unit-add/unit-add.component';
import { UnitEditComponent } from './unit-edit/unit-edit.component';


const routes: Routes = [
  {
    path:'',
    children:[
      { path:'list', component:UnitListComponent, canActivate: [AdminGuardService]},
      { path:'add', component:UnitAddComponent, canActivate: [AdminGuardService]},
      { path:'edit', component:UnitEditComponent, canActivate: [AdminGuardService]}

    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
    ]
})
export class UnitRoutingModule { }