import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditMediaPageRoutingModule } from './edit-media-routing.module';

import { EditMediaPage } from './edit-media.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditMediaPageRoutingModule
  ],
  declarations: [EditMediaPage]
})
export class EditMediaPageModule {}
