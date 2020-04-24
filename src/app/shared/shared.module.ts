import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './component/alert/alert.component';
import { CustomSelectComponent } from './component/custom-select/custom-select.component';

@NgModule({
  imports: [ CommonModule ],
  declarations: [CustomSelectComponent, AlertComponent],
  exports: [CustomSelectComponent]
})
export class SharedModule {
}
