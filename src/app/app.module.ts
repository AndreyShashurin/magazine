import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatPaginatorIntl} from '@angular/material/paginator';
import { ModalModule } from 'ngx-bootstrap/modal';
import { StoreModule } from '@ngrx/store';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentComponent } from './site/content/content.component';
import { SpaHeaderComponent } from './site/header/header.component';
import { IconBarComponent } from './site/icon-bar/icon-bar.component';
import { MenuService } from './shared/services/menu.service';
import { ScreenService } from './shared/services/screen.service';
import { NavComponent } from './site/nav/nav.component';
import { SpaConfigService } from './shared/services/config.service';
import { AuthenticatedComponent } from './site/authenticated/authenticated.component';
import { SingInComponent } from './site/sing-site/sing-in.component';
import { DbService } from './shared/services/db.service';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './site/home.component';
import { AuthGuard } from './shared/services/auth-guard.service';
import { AuthService } from './shared/services/auth.service';
import { CartService } from './shared/services/cart.service';
import { DashboardComponent } from './site/dashboard/dashboard.component';
import { InterfaceService } from './shared/interface/interface.service';
import { ReportsComponent } from './site/reports/reports.component';
import { NewsfeedComponent } from './site/reports/newsfeed/newsfeed.component';
import { DiscountComponent } from './site/reports/discount/discount.component';
import { StaffComponent } from './site/reports/staff/staff.component';
import { IngredientsComponent } from './site/reports/ingredients/ingredients.component';
import { BillComponent } from './site/finance/bill/bill.component';
import { FinanсeComponent } from './site/finance/finance.component';
import { ParamsModel } from './shared/services/params.model';
import { ReceptComponent } from './site/recept/recept.component';
import { PersonalComponent } from './site/personal/personal.component';
import { newPersonalComponent } from './site/personal/new-personal.component';
import { DeactivateGuard } from './shared/services/deactivate-guard.service';
import { updatePersonalComponent } from './site/personal/update-personal.component';
import { CustomSelectComponent } from './site/shared/custom-select/custom-select.component';
import { AlertComponent } from './site/shared/alert/alert.component';
import { ModalContentComponent } from './site/shared/modal-content/modal-content.component';
import { ModalDetailComponent } from './site/shared/modal-detail/modal-detail.component';
import { ModalUpdateComponent } from './site/shared/modal-update/modal-update.component';
import { SettingsService } from './shared/services/settings.service';
import { FilterComponentModule } from './site/filter/filter.component';
import { AddWarehousComponent } from './site/warehouse/add-warehous/add-warehous.component';
import { WriteOfComponent } from './site/warehouse/write/writeof.component';
import { AutosizeDirective } from './directives/autosize.directive';
import { TerminalComponent } from './terminal/terminal.component';
import { TerminalHeaderComponent } from './terminal/terminal-header/terminal-header.component';
import { TerminalIdComponent } from './terminal/terminal-id/terminal-id.component';
import { TerminalBillComponent } from './terminal/terminal-bill/terminal-bill.component';
import { SingTerminalComponent } from './terminal/sing-terminal/sing-terminal.component';
import { TerminalContentComponent } from './terminal/terminal-content/terminal-content.component';
import { ModalTerminalComponent } from './terminal/modal-terminal/modal-terminal/modal-terminal.component';
import { FilialComponent } from './site/filial/filial.component';
import { AuthInterceptor } from './shared/services/auth.interceptor';
import { AccessComponent } from './site/access/access.component';
import { MenuAddTovarComponent } from './site/menu-add-tovar/menu-add-tovar.component';
import { MenuAddReceptComponent } from './site/menu-add-recept/menu-add-recept.component';
import { appReducers } from './store/index';
import { SeriesModule } from './site/series/series.module';
import { SettingsEffects } from './store/effects/settings.effcets';
import { EffectsModule } from '@ngrx/effects';
import { AddFilialComponent } from './site/filial/add-filial/add-filial.component';
import { CategoryComponent } from './site/category/category.component';
import { AccoutnsComponent } from './site/finance/accoutns/accoutns.component';
import { TaxesComponent } from './site/finance/taxes/taxes.component';
import { CategoriesComponent } from './site/finance/categories/categories.component';
import { getDutchPaginatorIntl } from './shared/paginatorIntl';
import { KitchenComponent } from './kitchen/kitchen/kitchen.component';
import { WebsocketModule } from './websocket/websocket.module';
import { environment } from 'src/environments/environment';
import { ModalComponent } from './site/finance/categories/modal/modal.component';
import { CurrencyFormatterDirective } from './directives/currency.directive';
import { ModalChangeComponent } from './site/finance/change/modal-change/modal-change.component';
import { MaterialModule } from './shared/material/material.module';
import { RoundPipe } from './directives/round.pipe';
import { PaginatorComponentModule } from './site/paginator/paginator.module';
import { PricePipeModule } from './directives/price-pipe.module';
import { ModalTransactionComponent } from './terminal/modal-transaction/modal-transaction.component';
import { ComboComponent } from './site/combo/combo.component';
import { ComboFormComponent } from './site/combo/combo-form/combo-form.component';
import { GuardTerminalService } from './shared/services/guard-terminal.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent, 
    SpaHeaderComponent,
    IconBarComponent,
    NavComponent,
    AuthenticatedComponent,
    SingInComponent,
    DashboardComponent,
    ContentComponent,
    ModalContentComponent,
    ModalUpdateComponent,
    ModalDetailComponent,
    ModalTerminalComponent,
    MenuAddTovarComponent,
    MenuAddReceptComponent,
    ReportsComponent,
    IngredientsComponent,
    NewsfeedComponent,
    DiscountComponent,
    StaffComponent,
    BillComponent,
    FinanсeComponent,
    CustomSelectComponent,
    ReceptComponent,
    PersonalComponent,
    newPersonalComponent,
    updatePersonalComponent,
    AlertComponent,
    AddWarehousComponent,
    WriteOfComponent,
    AutosizeDirective,
    TerminalContentComponent,
    TerminalComponent,
    TerminalIdComponent,
    TerminalBillComponent,
    TerminalHeaderComponent,
    SingTerminalComponent,
    FilialComponent,
    AccessComponent,
    AddFilialComponent,
    CategoryComponent,
    AccoutnsComponent,
    TaxesComponent,
    CategoriesComponent,
    KitchenComponent,
    ModalComponent,
    CurrencyFormatterDirective,
    ModalChangeComponent,
    RoundPipe,
    ModalTransactionComponent,
    ComboComponent,
    ComboFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ScrollDispatchModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([SettingsEffects]),
    SeriesModule,
    MaterialModule,
    FilterComponentModule,
    PaginatorComponentModule,
    PricePipeModule,
    WebsocketModule.config({
        url: environment.ws
    })
  ],
  providers: [
    MenuService, 
    SpaConfigService,
    ScreenService,
    DbService,
    HttpClient,
    AuthGuard,
    GuardTerminalService,
    DeactivateGuard,
    ParamsModel,
    InterfaceService,
    AuthService,
    SettingsService,
    CartService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    { provide: MatPaginatorIntl, useValue: getDutchPaginatorIntl() }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalContentComponent,
    ModalDetailComponent,
    ModalTerminalComponent,
    ModalUpdateComponent,
    ModalComponent,
    ModalChangeComponent,
    ModalTransactionComponent
  ]
})
export class AppModule { }
