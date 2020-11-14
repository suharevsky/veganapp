import {Component, OnInit} from '@angular/core';
import {LoadingController, NavController} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import {UserService} from 'src/app/services/user/user.service';
import {HttpService} from 'src/app/services/http/http.service';
import {Plugins} from '@capacitor/core';
import {Keyboard} from '@ionic-native/keyboard/ngx';
import {UIComponent} from '../../components/ui/ui.component';

const {Geolocation} = Plugins;

@Component({
    selector: 'app-landing',
    templateUrl: './landing.page.html',
    styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

    public fbId: any;
    public form: any;
    public errors: any;
    public isNewUser: any;

    constructor(
        private navCtrl: NavController,
        private loadingCtrl: LoadingController,
        private keyboard: Keyboard,
        public uiComponent: UIComponent,
        public router: Router,
        public storage: Storage,
        public userService: UserService,
        public httpService: HttpService,
        public http: HttpClient
    ) {
    }

    ngOnInit() {
        this.storage.get('user_data').then((user) => {
            this.isNewUser = !user;
        });
    }

    getPage(page: string) {
        this.router.navigate(['/' + page]);
    }

    validate(response: any) {
        this.errors = '';
        if (response.status) {
            if (response.status !== 'not_activated') {
                this.fbId = '';
                this.storage.set('user_data', {
                    username: response.username,
                    password: this.form.login.password.value,
                    status: response.status,
                    user_id: response.id,
                    user_photo: response.photo
                });

                // this.checkPayment();

                this.httpService.setHeaders(true, response.username, this.form.login.password.value);
                // this.setLocation();
            }

            if (response.status === 'login') {
                this.router.navigate(['/home']);

            } else if (response.status === 'no_photo') {
                // this.user.id = response.id;


            } else if (response.status === 'not_activated') {
                this.router.navigate(['/login']);
            }
        } else {
            this.errors = response.is_not_active ? this.form.errors.account_is_disabled : this.form.errors.bad_credentials;
        }
        this.storage.get('deviceToken').then((deviceToken) => {
            if (deviceToken) {
                // this.sendPhoneId(deviceToken);
            }
        });

    }

    public sendPhoneId(idPhone) {
        const data = JSON.stringify({phone_id: idPhone});
        this.http.post(
            this.httpService.getSegmentUrl() + '/phones', data,
            this.httpService.setHeaders(true, this))
            .subscribe(() => {
            }), (err: string) => console.log('error was in send phone: ' + err);
    }

    public setLocation() {
        Geolocation.getCurrentPosition().then((pos: { coords: { latitude: any; longitude: any; }; }) => {
            const params = {
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude
            };

            this.http.post(
                this.httpService.getSegmentUrl() + '/locations', params,
                this.httpService.setHeaders(true, this)).subscribe(data => {
            });
        });
    }

    formSubmit() {
        let postData = '';
        if (this.fbId) {
            postData = JSON.stringify({facebook_id: this.fbId});
        }

        this.http.post(
            this.httpService.getSegmentUrl() + '/logins.json', postData, this.httpService.setHeaders(true, this.userService))
            .subscribe(data => {
                this.validate(data);
            }, err => {
                if (this.form.errors.is_not_active) {
                    this.errors = 'משתמש זה נחסם על ידי הנהלת האתר';
                } else {
                    this.errors = this.form.errors.bad_credentials;
                }
            });
    }

    async goToExplore() {

        await this.storage.set('user_data', {
            username: 'admin',
            password: 'poiqwe12',
            status: '',
            user_id: '',
            user_photo: 'https://res.cloudinary.com/greendate/image/upload/c_fill,h_600,w_581/j1bamvemeljkeyfiqyl5'
        });

        this.userService.setPassword('poiqwe12');
        this.userService.setUsername('admin');
        this.userService.setMainPhoto('https://res.cloudinary.com/greendate/image/upload/c_fill,h_600,w_581/j1bamvemeljkeyfiqyl5');

        const loading = await this.loadingCtrl.create({
            message: 'Logging In...',
            translucent: true
        });

        await loading.present();

        setTimeout(() => {
            loading.dismiss();
            this.navCtrl.navigateRoot('/explore');
        }, 1000); // dummy loader for Log In
    }
}
