import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomepageComponent } from './home/homepage/homepage.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';


// Lazy Loading  for main routes 
const routes: Routes = [
  {
    path:'',
    component:HomepageComponent
  },
  {
    path:'auth', 
    loadChildren:() => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path:'**', 
    component:NotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
