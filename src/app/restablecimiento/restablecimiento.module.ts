import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestablecimientoPageRoutingModule } from './restablecimiento-routing.module';

import { RestablecimientoPage } from './restablecimiento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestablecimientoPageRoutingModule
  ],
  declarations: [RestablecimientoPage]
})
export class RestablecimientoPageModule {}
