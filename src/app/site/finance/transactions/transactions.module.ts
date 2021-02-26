import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { TransactionsComponent } from './transactions.component';
import { TransactionsRoutingModule } from './transactions-routing.module';
import { FilterComponentModule } from '../../filter/filter.component';
import { PaginatorComponentModule } from '../../paginator/paginator.module';

@NgModule({
  declarations: [ TransactionsComponent ],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    MaterialModule,
    FilterComponentModule,
    PaginatorComponentModule
  ]
})
export class TransactionsModule { }
