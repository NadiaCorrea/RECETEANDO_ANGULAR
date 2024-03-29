import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    PaginatorComponent
  ],
  imports: [
    CommonModule,
    RouterModule, 
    FormsModule
  ], 
  exports:[
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    PaginatorComponent
  ]
})
export class SharedModule { }
