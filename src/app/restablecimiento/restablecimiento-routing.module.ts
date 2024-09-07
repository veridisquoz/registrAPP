import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestablecimientoPage } from './restablecimiento.page';

const routes: Routes = [
  {
    path: '',
    component: RestablecimientoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestablecimientoPageRoutingModule {}
