import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { PaginatorComponentModule } from '../../paginator/paginator.module';
import { FilterComponentModule } from '../../filter/filter.component';
import { DiscardComponent } from './discard.component';
import { DiscardRoutingModule } from './discard-routing.module';

@NgModule({
  declarations: [ DiscardComponent ],
  imports: [
    CommonModule,
    DiscardRoutingModule,
    MaterialModule,
    FilterComponentModule,
    PaginatorComponentModule
  ]
})
export class DiscardModule { }
