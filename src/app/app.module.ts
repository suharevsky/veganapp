import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {FormsModule} from '@angular/forms';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {TapticEngine} from '@ionic-native/taptic-engine/ngx';
import {IonicStorageModule} from '@ionic/storage';
import { Keyboard } from '@ionic-native/keyboard/ngx';


import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SharedModule} from './components/sharedModule';
import {ProfilePageModule} from './pages/profile/profile.module';
import {SettingsPageModule} from './pages/settings/settings.module';
import {ProfileEditPageModule} from './pages/profile-edit/profile-edit.module';
import {MatchedModalPageModule} from './pages/matched-modal/matched-modal.module';
import {TinderGoldPageModule} from './pages/tinder-gold/tinder-gold.module';
import {HttpClientModule} from '@angular/common/http';
import {ChangePasswordPageModule} from './pages/change-password/change-password.module';
import {UIComponent} from './components/ui/ui.component';
import {FilterResultsPageModule} from './pages/filter-results/filter-results.module';
import {ChatPageModule} from './pages/chat/chat.module';
import { Network } from '@ionic-native/network/ngx';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        FormsModule,
        IonicModule.forRoot({
            mode: 'ios',
            backButtonText: '',
            // swipeBackEnabled: false,
        }),
        AppRoutingModule,
        IonicStorageModule.forRoot({
            name: 'tinder',
            driverOrder: ['indexeddb', 'sqlite', 'websql']
        }),
        SharedModule,
        ProfilePageModule,
        ChangePasswordPageModule,
        SettingsPageModule,
        ChatPageModule,
        ProfileEditPageModule,
        MatchedModalPageModule,
        TinderGoldPageModule,
        FilterResultsPageModule,
        HttpClientModule
    ],
    providers: [
        UIComponent,
        StatusBar,
        Keyboard,
        Network,
        SplashScreen,
        TapticEngine,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
