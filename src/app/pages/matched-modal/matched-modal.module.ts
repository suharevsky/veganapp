import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MatchedModalPageRoutingModule } from './matched-modal-routing.module';

import { MatchedModalPage } from './matched-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatchedModalPageRoutingModule
  ],
  declarations: [MatchedModalPage]
})
export class MatchedModalPageModule {}
