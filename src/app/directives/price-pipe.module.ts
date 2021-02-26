import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { PricePipe } from './priceFormat.pipe';

@NgModule({
  declarations: [ PricePipe ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [PricePipe]
})
export class PricePipeModule { }