import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactUsPageRoutingModule } from './contact-us-routing.module';

import { ContactUsPage } from './contact-us.page';
import {ForgotPasswordPageModule} from '../forgot-password/forgot-password.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ContactUsPageRoutingModule,
        ForgotPasswordPageModule
    ],
  declarations: [ContactUsPage]
})
export class ContactUsPageModule {}
