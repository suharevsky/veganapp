import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';
import {ForgotPasswordPageModule} from '../forgot-password/forgot-password.module';
import {LandingPageModule} from '../landing/landing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RegisterPageRoutingModule,
        ForgotPasswordPageModule,
        LandingPageModule
    ],
  declarations: [RegisterPage]
})
export class RegisterPageModule {}
