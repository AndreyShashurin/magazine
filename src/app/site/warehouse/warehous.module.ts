import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FilterComponentModule } from '../filter/filter.component';
import { PaginatorComponentModule } from '../paginator/paginator.module';
import { WarehouseComponent } from './warehouse.component';
import { WarehouseRoutingModule } from './warehous-routing.module';

@NgModule({
  declarations: [ WarehouseComponent ],
  imports: [
    CommonModule,
    WarehouseRoutingModule,
    MaterialModule,
    FilterComponentModule,
    PaginatorComponentModule
  ]
})
export class WarehouseModule { }
