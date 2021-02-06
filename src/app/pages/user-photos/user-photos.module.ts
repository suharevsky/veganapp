import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangePhotosPageRoutingModule } from './user-photos-routing.module';

import { UserPhotosPage } from './user-photos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangePhotosPageRoutingModule
  ],
  declarations: [UserPhotosPage]
})
export class UserPhotosPageModule {}
