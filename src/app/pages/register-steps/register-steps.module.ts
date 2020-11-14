import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterStepsPageRoutingModule } from './register-steps-routing.module';

import { RegisterStepsPage } from './register-steps.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterStepsPageRoutingModule
  ],
  declarations: [RegisterStepsPage]
})
export class RegisterStepsPageModule {}
