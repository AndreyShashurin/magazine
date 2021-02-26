import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { DeliveryComponent } from './delivery.component';
import { PaginatorComponentModule } from '../../paginator/paginator.module';
import { FilterComponentModule } from '../../filter/filter.component';
import { DeliveryRoutingModule } from './delivery-routing.module';

@NgModule({
  declarations: [ DeliveryComponent ],
  imports: [
    CommonModule,
    DeliveryRoutingModule,
    MaterialModule,
    FilterComponentModule,
    PaginatorComponentModule
  ]
})
export class DeliveryModule { }
