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
import { FinanсeComponent } from './site/finance/finance.component';
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
import { FilialComponent } from './site/filial/filial.component';
import { AccessComponent } from './site/access/access.component';
import { MenuAddTovarComponent } from './site/menu-add-tovar/menu-add-tovar.component';
import { MenuAddReceptComponent } from './site/menu-add-recept/menu-add-recept.component';
import { AddFilialComponent } from './site/filial/add-filial/add-filial.component';
import { CategoryComponent } from './site/category/category.component';
import { TaxesComponent } from './site/finance/taxes/taxes.component';
import { AccoutnsComponent } from './site/finance/accoutns/accoutns.component';
import { ChangeComponent } from './site/finance/change/change.component';
import { CategoriesComponent } from './site/finance/categories/categories.component';
import { KitchenComponent } from './kitchen/kitchen/kitchen.component';

const routes: Routes = [
    {path: '', component: SingInComponent},
    {
        path: "dashboard",
        component: HomeComponent,
        canActivateChild: [AuthGuard],
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
                { path: "сhange", component: ChangeComponent},
                { path: "accounts", component: AccoutnsComponent},
                { path: "taxes", component: TaxesComponent},
                { path: "categories", component: CategoriesComponent},
                { path: "filial", component: FilialComponent},
                { path: "addFilial", component: AddFilialComponent},
                { path: "settings", component: SettingsComponent, data: { roles: ["admin"] }},
                { path: "group", component: AccessComponent},
                { path: "personal", component: PersonalComponent},
                { path: "newpersonal", component: newPersonalComponent, canDeactivate: [DeactivateGuard]},
                { path: "updatepersonal/:id", component: updatePersonalComponent},
                { path: "warehouse", component: WarehouseComponent},
                    { path: 'addSklad', component: AddWarehousComponent},
                    { path: 'suppliers', component: SuppliersComponent},
                    { path: 'delivery', component: DeliveryComponent},
                    { path: 'discard', component: DiscardComponent},  
                    { path: 'write', component: WriteOfComponent},
                { path: "menu", /*loadChildren: () => import('./site/menu/menu.module').then(m => m.MenuModule),*/ component: MenuComponent},
                { path: "category", component: CategoryComponent},
                { path: "addtovar", component: MenuAddTovarComponent},
                { path: "addrecept", component: MenuAddReceptComponent}
            ]
        }]
    },  
    {
        path: "terminal",
        component: SingTerminalComponent,
        //canActivate: [GuardTerminal],
    },
    {path: 'kitchen', component: KitchenComponent},
    {path: 'terminal/index', component: TerminalComponent},
    {path: 'terminal/index/:id', component: TerminalIdComponent}   
 // {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
