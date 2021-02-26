import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { PaginatorComponent } from './paginator.component';

@NgModule({
  declarations: [ PaginatorComponent ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [PaginatorComponent]
})
export class PaginatorComponentModule { }