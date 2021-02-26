import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FilterComponentModule } from '../../filter/filter.component';
import { PaginatorComponentModule } from '../../paginator/paginator.module';
import { ChangeComponent } from './change.component';
import { ChangeRoutingModule } from './change-routing.module';
import { PricePipeModule } from 'src/app/directives/price-pipe.module';

@NgModule({
  declarations: [ ChangeComponent ],
  imports: [
    CommonModule,
    ChangeRoutingModule,
    MaterialModule,
    FilterComponentModule,
    PaginatorComponentModule,
    PricePipeModule
  ]
})
export class ChangeModule { }
