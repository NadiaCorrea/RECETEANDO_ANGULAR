import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { RecipeModule } from './recipe/recipe.module';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { RecipeService } from './services/recipe.service';
import { UserModule } from './user/user.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UnitModule } from './unit/unit.module';
import { UnitService } from './services/unit.service';
import { CategoryModule } from './category/category.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule, 
    HomeModule,
    AuthModule,
    HttpClientModule,
    RecipeModule, 
    UserModule,
    BrowserAnimationsModule,
    UnitModule,
    CategoryModule
  ],
  providers: [ 
    AuthGuardService,
    AuthenticationService,
    UserService,
    RecipeService,
    UnitService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi:true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
