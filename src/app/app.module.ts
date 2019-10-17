import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MatTableModule, MatCheckboxModule, MatSelectModule, MatInputModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentComponent } from './spa/content/content.component';
import { SpaHeaderComponent } from './spa/header/header.component';
import { IconBarComponent } from './spa/icon-bar/icon-bar.component';
import { MenuService } from './services/menu.service';
import { ScreenService } from './services/screen.service';
import { NavComponent } from './spa/nav/nav.component';
import { SpaConfigService } from './services/config.service';
import { AuthenticatedComponent } from './spa/authenticated/authenticated.component';
import { SingInComponent } from './sing-in/sing-in.component';
import { DbService } from './db.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './spa/home.component';
import { SettingsComponent } from './spa/settings/settings.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { DashboardComponent } from './spa/dashboard/dashboard.component';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { WarehouseComponent } from './spa/warehouse/warehouse.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalContentComponent } from './modal-content/modal-content.component';
import { MenuComponent } from './spa/menu/menu.component';
import { ModalDetailComponent } from './modal-detail/modal-detail.component';
import { InterfaceService } from './services/interface.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReportsComponent } from './spa/reports/reports.component';
import { NewsfeedComponent } from './spa/reports/newsfeed/newsfeed.component';
import { DiscountComponent } from './spa/reports/discount/discount.component';
import { StaffComponent } from './spa/reports/staff/staff.component';
import { IngredientsComponent } from './spa/reports/ingredients/ingredients.component';
import { BillComponent } from './spa/finance/bill/bill.component';
import { TransactionsComponent } from './spa/finance/transactions/transactions.component';
import { FinanсeComponent } from './spa/finance/finanсe.component';
import { ParamsModel } from './services/params.model';
import { CustomSelectComponent } from './shared/custom-select/custom-select.component';
import { ReceptComponent } from './spa/recept/recept.component';
import { PersonalComponent } from './spa/personal/personal.component';
import { newPersonalComponent } from './spa/personal/new-personal.component';
import { DeactivateGuard } from './services/deactivate-guard.service';
import { updatePersonalComponent } from './spa/personal/update-personal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SpaHeaderComponent,
    IconBarComponent,
    NavComponent,
    AuthenticatedComponent,
    SingInComponent,
    SettingsComponent,
    DashboardComponent,
    ContentComponent,
    WarehouseComponent,
    ModalContentComponent,
    ModalDetailComponent,
    MenuComponent,
    ReportsComponent,
    IngredientsComponent,
    NewsfeedComponent,
    DiscountComponent,
    StaffComponent,
    BillComponent,
    FinanсeComponent,
    TransactionsComponent,
    CustomSelectComponent,
    ReceptComponent,
    PersonalComponent,
    newPersonalComponent,
    updatePersonalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ScrollDispatchModule,
    MatTableModule,
    AppRoutingModule,
    MatCheckboxModule,
    MatSelectModule,    
    MatInputModule,
    ModalModule.forRoot()
  ],
  providers: [
    MenuService, 
    SpaConfigService,
    ScreenService,
    DbService,
    HttpClient,
    AuthGuard,
    DeactivateGuard,
    ParamsModel,
    InterfaceService,
    AuthService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalContentComponent,
    ModalDetailComponent
  ]
})
export class AppModule { }
