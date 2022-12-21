import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BolosPage } from './bolos.page';

const routes: Routes = [
  {
    path: '',
    component: BolosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BolosPageRoutingModule {}
