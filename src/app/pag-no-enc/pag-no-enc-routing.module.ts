import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagNoEncPage } from './pag-no-enc.page';

const routes: Routes = [
  {
    path: '',
    component: PagNoEncPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagNoEncPageRoutingModule {}
