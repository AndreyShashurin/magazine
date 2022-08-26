import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './site/home.component';
import { SingInComponent } from './site/sing-site/sing-in.component';
import { AuthGuard } from './shared/services/auth-guard.service';
import { DashboardComponent } from './site/dashboard/dashboard.component';
import { DiscountComponent } from './site/reports/discount/discount.component';
import { ReportsComponent } from './site/reports/reports.component';
import { StaffComponent } from './site/reports/staff/staff.component';
import { IngredientsComponent } from './site/reports/ingredients/ingredients.component';
import { BillComponent } from './site/finance/bill/bill.component';
import { FinanсeComponent } from './site/finance/finance.component';
import { NewsfeedComponent } from './site/reports/newsfeed/newsfeed.component';
import { PersonalComponent } from './site/personal/personal.component';
import { newPersonalComponent } from './site/personal/new-personal.component';
import { DeactivateGuard } from './shared/services/deactivate-guard.service';
import { updatePersonalComponent } from './site/personal/update-personal.component';
import { AddWarehousComponent } from './site/warehouse/add-warehous/add-warehous.component';
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
import { CategoriesComponent } from './site/finance/categories/categories.component';
import { KitchenComponent } from './kitchen/kitchen/kitchen.component';
import { ComboComponent } from './site/combo/combo.component';
import { ComboFormComponent } from './site/combo/combo-form/combo-form.component';

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
                { path: "transactions", loadChildren: () => import('./site/finance/transactions/transactions.module').then(m => m.TransactionsModule)},
                { path: "сhange", loadChildren: () => import('./site/finance/change/change.module').then(m => m.ChangeModule)},
                { path: "accounts", component: AccoutnsComponent},
                { path: "taxes", component: TaxesComponent},
                { path: "categories", component: CategoriesComponent},
                { path: "filial", component: FilialComponent},
                { path: "addFilial", component: AddFilialComponent},
                { path: "settings", loadChildren: () => import('./site/settings/settings.module').then(m => m.SettingsModule), data: { roles: ["admin"] }},
                { path: "group", component: AccessComponent},
                { path: "personal", component: PersonalComponent},
                { path: "newpersonal", component: newPersonalComponent, canDeactivate: [DeactivateGuard]},
                { path: "updatepersonal/:id", component: updatePersonalComponent},
                { path: "warehouse", loadChildren: () => import('./site/warehouse/warehous.module').then(m => m.WarehouseModule)},
                    { path: 'addSklad', component: AddWarehousComponent},
                    { path: 'suppliers', loadChildren: () => import('./site/warehouse/suppliers/suppliers.module').then(m => m.SuppliersModule)},
                    { path: 'delivery', loadChildren: () => import('./site/warehouse/delivery/delivery.module').then(m => m.DeliveryModule)},
                    { path: 'discard', loadChildren: () => import('./site/warehouse/discard/discard.module').then(m => m.DiscardModule)},  
                    { path: 'write', component: WriteOfComponent},
                { path: "menu", loadChildren: () => import('./site/menu/menu.module').then(m => m.MenuModule)},
                { path: "category", component: CategoryComponent},
                { path: "addtovar", component: MenuAddTovarComponent},
                { path: "addrecept", component: MenuAddReceptComponent},
                { path: "combo", component: ComboComponent},
                { path: "comboform", component: ComboFormComponent},
                { path: "comboform/:id", component: ComboFormComponent}
            ]
        }]
    },  
    {
        path: "terminal",
        component: SingTerminalComponent,
        //canActivate: [GuardTerminalService],
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
