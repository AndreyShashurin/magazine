import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from '../site/filter/filter.component';
import { PaginatorComponent } from '../site/paginator/paginator.component';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ FilterComponent, PaginatorComponent ],
  exports: [ FilterComponent, PaginatorComponent]
})
export class SharedModule {
}
