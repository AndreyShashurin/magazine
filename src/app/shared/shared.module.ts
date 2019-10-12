import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomSelectComponent } from './custom-select/custom-select.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CustomSelectComponent],
  exports: [CustomSelectComponent]
})
export class SharedModule {
}
