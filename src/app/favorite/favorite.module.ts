import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoriteRoutingModule } from './favorite-routing.module';
import { FavoriteListComponent } from './favorite-list/favorite-list.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    FavoriteListComponent
  ],
  imports: [
    CommonModule,
    FavoriteRoutingModule,
    RouterModule
  ]
})
export class FavoriteModule { }
