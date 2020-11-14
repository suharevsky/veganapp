import {Component, ViewChild} from '@angular/core';

import {Platform, IonRouterOutlet} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {ThemeService} from './services/theme/theme.service';
import {RouterService} from './services/router.service';
import {Network} from '@ionic-native/network/ngx';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    @ViewChild(IonRouterOutlet, {static: false}) routerOutlet: IonRouterOutlet;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private themeService: ThemeService,
        private RouterService: RouterService,
        private network: Network,
        // private navCtrl: NavController
    ) {
        this.initializeApp();
        /*this.storage.get('user_data').then(userData => {
            if (userData.password) {
              this.navCtrl.navigateForward('/explore', {animated: false});
            } else {
              this.navCtrl.navigateForward('/landing', {animated: false});
            }
        });*/
    }

    ngAfterViewInit(): void {
        this.RouterService.init(this.routerOutlet);
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });

        this.themeService.restore();

        // watch network for a disconnection
        const disconnectSubscription = this.network.onDisconnect().subscribe(() => {
            alert('Network was disconnected. Please check your connection and restart the app');
        });

        // stop disconnect watch
        disconnectSubscription.unsubscribe();
    }
}
