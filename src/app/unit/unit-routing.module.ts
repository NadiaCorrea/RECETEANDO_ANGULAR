import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuardService } from '../services/admin-guard.service';
import { UnitListComponent } from './unit-list/unit-list.component';


const routes: Routes = [
  {
    path:'',
    children:[
      { path:'list', component:UnitListComponent, canActivate: [AdminGuardService]}

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
