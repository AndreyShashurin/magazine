import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiscardComponent } from './discard.component';

const routes: Routes = [{ path: '', component: DiscardComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiscardRoutingModule { }