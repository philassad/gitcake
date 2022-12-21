import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BolosPageRoutingModule } from './bolos-routing.module';

import { BolosPage } from './bolos.page';
import { MenuModule } from 'src/app/componentes/menu/menu.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BolosPageRoutingModule,
    MenuModule
  ],
  declarations: [BolosPage]
})
export class BolosPageModule {}
