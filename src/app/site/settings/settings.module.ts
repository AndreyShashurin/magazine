import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { PaymentComponentModule } from '../payment/payment.component';
import { FilterComponentModule } from '../filter/filter.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ SettingsComponent ],
  imports: [
    CommonModule,
    FormsModule,
    SettingsRoutingModule,
    MaterialModule,
    PaymentComponentModule,
    FilterComponentModule
  ]
})
export class SettingsModule { }
