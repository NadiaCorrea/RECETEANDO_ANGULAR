import { HomepageComponent } from './home/homepage/homepage.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { AuthGuardService } from './services/auth-guard.service';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';


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
    path:'recipe', 
    canActivateChild:[AuthGuardService],
    loadChildren:() => import('./recipe/recipe.module').then(m => m.RecipeModule)
  },
  {
    path:'user', 
    canActivateChild:[AuthGuardService],
    loadChildren:() => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path:'unit', 
    canActivateChild:[AuthGuardService],
    loadChildren:() => import('./unit/unit.module').then(m => m.UnitModule)
  },
  {
    path:'category', 
    canActivateChild:[AuthGuardService],
    loadChildren:() => import('./category/category.module').then(m => m.CategoryModule)
  },
  {
    path:'ingredient', 
    canActivateChild:[AuthGuardService],
    loadChildren:() => import('./ingredient/ingredient.module').then(m => m.IngredientModule)
  },
  {
    path:'favorite', 
    canActivateChild:[AuthGuardService],
    loadChildren:() => import('./favorite/favorite.module').then(m => m.FavoriteModule)
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
