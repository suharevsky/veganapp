import {Component, OnInit} from '@angular/core';
import {LoadingController, NavController} from '@ionic/angular';
import {UIComponent} from '../../components/ui/ui.component';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import {UserService} from '../../services/user/user.service';
import {HttpService} from '../../services/http/http.service';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {

    public fbId: any;
    public form: any;
    public errors: any;

    constructor(
        private navCtrl: NavController,
        private loadingCtrl: LoadingController,
        public uiComponent: UIComponent,
        public router: Router,
        public storage: Storage,
        public userService: UserService,
        public httpService: HttpService,
        public http: HttpClient
    ) {
    }

    ngOnInit() {
    }

    goToPage(url: string) {
        this.navCtrl.navigateRoot(url);
    }

    getPage(page: string) {
        this.router.navigate(['/' + page]);
    }

    back() {
        this.navCtrl.back();
    }

    register() {
        this.navCtrl.navigateForward('/register-steps');
    }
}
