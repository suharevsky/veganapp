import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangePhotosPageRoutingModule } from './change-photos-routing.module';

import { ChangePhotosPage } from './change-photos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangePhotosPageRoutingModule
  ],
  declarations: [ChangePhotosPage]
})
export class ChangePhotosPageModule {}
