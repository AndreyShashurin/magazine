import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MenuRoutingModule } from './menu-routing.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FilterComponentModule } from '../filter/filter.component';
import { PaginatorComponentModule } from '../paginator/paginator.module';

@NgModule({
  declarations: [MenuComponent ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    MaterialModule,
    FilterComponentModule,
    PaginatorComponentModule
  ]
})
export class MenuModule { }
