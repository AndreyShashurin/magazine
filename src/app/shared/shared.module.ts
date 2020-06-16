import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '../site/shared/alert/alert.component';
import { CustomSelectComponent } from '../site/shared/custom-select/custom-select.component';

@NgModule({
  imports: [ CommonModule ],
  declarations: [CustomSelectComponent, AlertComponent],
  exports: [CustomSelectComponent]
})
export class SharedModule {
}
