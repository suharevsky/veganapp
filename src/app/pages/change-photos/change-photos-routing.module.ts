import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangePhotosPage } from './change-photos.page';

const routes: Routes = [
  {
    path: '',
    component: ChangePhotosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangePhotosPageRoutingModule {}
