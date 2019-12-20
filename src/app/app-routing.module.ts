import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './site/home.component';
import { SingInComponent } from './site/sing-site/sing-in.component';
import { AuthGuard } from './shared/services/auth-guard.service';
import { GuardTerminal } from './shared/services/guardterminal.service';
import { DashboardComponent } from './site/dashboard/dashboard.component';
import { DiscountComponent } from './site/reports/discount/discount.component';
import { ReportsComponent } from './site/reports/reports.component';
import { StaffComponent } from './site/reports/staff/staff.component';
import { IngredientsComponent } from './site/reports/ingredients/ingredients.component';
import { TransactionsComponent } from './site/finance/transactions/transactions.component';
import { BillComponent } from './site/finance/bill/bill.component';
import { FinanсeComponent } from './site/finance/finanсe.component';
import { NewsfeedComponent } from './site/reports/newsfeed/newsfeed.component';
import { SettingsComponent } from './site/settings/settings.component';
import { WarehouseComponent } from './site/warehouse/warehouse.component';
import { MenuComponent } from './site/menu/menu.component';
import { PersonalComponent } from './site/personal/personal.component';
import { newPersonalComponent } from './site/personal/new-personal.component';
import { DeactivateGuard } from './shared/services/deactivate-guard.service';
import { updatePersonalComponent } from './site/personal/update-personal.component';
import { AddWarehousComponent } from './site/warehouse/add-warehous/add-warehous.component';
import { SuppliersComponent } from './site/warehouse/suppliers/suppliers.component';
import { DeliveryComponent } from './site/warehouse/delivery/delivery.component';
import { DiscardComponent } from './site/warehouse/discard/discard.component';
import { WriteOfComponent } from './site/warehouse/write/writeof.component';
import { TerminalIdComponent } from './terminal/terminal-id/terminal-id.component';
import { SingTerminalComponent } from './terminal/sing-terminal/sing-terminal.component';
import { TerminalComponent } from './terminal/terminal.component';

const routes: Routes = [
  {path: '', component: SingInComponent},
  {
      path: "dashboard",
      component: HomeComponent,
      canActivate: [AuthGuard],
      children: [{
          path: '',
          children: [
              { path: "index", component: DashboardComponent},
              { path: "discount", component: DiscountComponent},
              { path: "reports", component: ReportsComponent},
              { path: "staff", component: StaffComponent},
              { path: "ingredients", component: IngredientsComponent},
              { path: "newsfeed", component: NewsfeedComponent},            
              { path: "finance", component: FinanсeComponent},           
              { path: "bill", component: BillComponent},          
              { path: "transactions", component: TransactionsComponent},          
              { path: "сhange", component: DashboardComponent},          
              { path: "balance", component: DashboardComponent},          
              { path: "taxes", component: DashboardComponent},          
              { path: "category", component: DashboardComponent},
              { path: "settings", component: SettingsComponent, data: { roles: ["admin"] }},
              { path: "personal", component: PersonalComponent},
              { path: "newpersonal", component: newPersonalComponent, canDeactivate: [DeactivateGuard]},
              { path: "updatepersonal/:id", component: updatePersonalComponent},
              { path: "warehouse", component: WarehouseComponent},
                  { path: 'addSklad', component: AddWarehousComponent},
                  { path: 'suppliers', component: SuppliersComponent},
                  { path: 'delivery', component: DeliveryComponent},
                  { path: 'discard', component: DiscardComponent},  
                  { path: 'write', component: WriteOfComponent},             
              { path: "menu", component: MenuComponent}
          ]
      }]
  },  
  {
      path: "terminal",
      component: SingTerminalComponent,
      //canActivate: [GuardTerminal],
  },
  {path: 'terminal/index', component: TerminalComponent},
  {path: 'terminal/index/:id', component: TerminalIdComponent}          
 // {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
