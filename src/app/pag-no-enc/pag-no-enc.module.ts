import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagNoEncPageRoutingModule } from './pag-no-enc-routing.module';

import { PagNoEncPage } from './pag-no-enc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagNoEncPageRoutingModule
  ],
  declarations: [PagNoEncPage]
})
export class PagNoEncPageModule {}
