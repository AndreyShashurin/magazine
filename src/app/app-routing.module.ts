import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './spa/home.component';
import { SingInComponent } from './sing-in/sing-in.component';
import { AuthGuard } from './shared/services/auth-guard.service';
import { DashboardComponent } from './spa/dashboard/dashboard.component';
import { DiscountComponent } from './spa/reports/discount/discount.component';
import { ReportsComponent } from './spa/reports/reports.component';
import { StaffComponent } from './spa/reports/staff/staff.component';
import { IngredientsComponent } from './spa/reports/ingredients/ingredients.component';
import { TransactionsComponent } from './spa/finance/transactions/transactions.component';
import { BillComponent } from './spa/finance/bill/bill.component';
import { FinanсeComponent } from './spa/finance/finanсe.component';
import { NewsfeedComponent } from './spa/reports/newsfeed/newsfeed.component';
import { SettingsComponent } from './spa/settings/settings.component';
import { WarehouseComponent } from './spa/warehouse/warehouse.component';
import { MenuComponent } from './spa/menu/menu.component';
import { PersonalComponent } from './spa/personal/personal.component';
import { newPersonalComponent } from './spa/personal/new-personal.component';
import { DeactivateGuard } from './shared/services/deactivate-guard.service';
import { updatePersonalComponent } from './spa/personal/update-personal.component';

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
              { path: "menu", component: MenuComponent},
          ]
      }]
  },
 // {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
