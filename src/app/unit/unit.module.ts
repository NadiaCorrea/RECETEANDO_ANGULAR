import { NgModule } from '@angular/core';
import { UnitListComponent } from './unit-list/unit-list.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';

import { UnitRoutingModule } from './unit-routing.module';
import { UnitEditComponent } from './unit-edit/unit-edit.component';
import { UnitAddComponent } from './unit-add/unit-add.component';

@NgModule({
    declarations:[
        UnitListComponent,
        UnitEditComponent,
        UnitAddComponent
    ],
    imports:[
        CommonModule,
        FormsModule, 
        RouterModule,
        MatTableModule, 
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatSortModule,
        UnitRoutingModule,
        MatDialogModule
      
    ]
})
export class UnitModule{ }