import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HomepageComponent
  ],
  imports: [
    CommonModule, 
    RouterModule
  ], 
  exports: [
    HomepageComponent
  ]
})
export class HomeModule { }
