import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { PaginatorComponentModule } from '../../paginator/paginator.module';
import { FilterComponentModule } from '../../filter/filter.component';
import { SuppliersComponent } from './suppliers.component';
import { SuppliersRoutingModule } from './suppliers-routing.module';

@NgModule({
  declarations: [ SuppliersComponent ],
  imports: [
    CommonModule,
    SuppliersRoutingModule,
    MaterialModule,
    FilterComponentModule,
    PaginatorComponentModule
  ]
})
export class SuppliersModule { }
