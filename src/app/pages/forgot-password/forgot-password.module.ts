import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgotPasswordPageRoutingModule } from './forgot-password-routing.module';

import { ForgotPasswordPage } from './forgot-password.page';
import {FooterBtnCloseComponent} from '../../components/footer-btn-close/footer-btn-close.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgotPasswordPageRoutingModule
  ],
  exports: [
    FooterBtnCloseComponent
  ],
  declarations: [ForgotPasswordPage, FooterBtnCloseComponent]
})
export class ForgotPasswordPageModule {}
