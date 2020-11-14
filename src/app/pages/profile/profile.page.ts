import {Component, ElementRef, OnInit} from '@angular/core';
import {NavParams, ModalController, NavController} from '@ionic/angular';
import {RouterService} from '../../services/router.service';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../../services/user/user.service';
import {HttpService} from '../../services/http/http.service';
import {UIComponent} from '../../components/ui/ui.component';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {
    user: any;
    profileImages: any[] = [];
    showSlides = false;

    constructor(
        public navParams: NavParams,
        public modalCtrl: ModalController,
        private navCtrl: NavController,
        private routerService: RouterService,
        private elementRef: ElementRef,
        private http: HttpClient,
        public userService: UserService,
        public httpService: HttpService,
        public uiComponent: UIComponent
    ) {
        this.user = navParams.data.user;
    }

    ngOnInit() {
        this.getData();
    }

    getKeys(obj) {
        return Object.keys(obj);
    }

    getData() {
        this.http.get(this.httpService.getSegmentUrl() + '/users/' + this.user.id, this.httpService
            .setHeaders(true, this.userService)).subscribe((data: any) => {
            this.user = data;
            this.user.formKeys = this.getKeys(data.form);
        });
    }

    block() {
        let params;

        if (this.user.isAddBlackListed === false) {

            this.user.isAddBlackListed = true;

            params = {
                list: 'BlackList',
                action: 'add'
            };

        } else if (this.user.isAddBlackListed === true) {

            this.user.isAddBlackListed = false;

            params = {
                list: 'BlackList',
                action: 'delete'
            };
        }

        this.http.post(this.httpService.getSegmentUrl() + '/lists/' + this.user.id, params, this.httpService
            .setHeaders(true, this.userService)).subscribe((data: any) => {
            this.uiComponent.toastCreate(data.success, 2500);
            // console.log('in there');
        });
    }

    // Known issue of using ion-slides in a modal template
    // https://github.com/ionic-team/ionic/issues/17522#issuecomment-557890661
    ionViewDidEnter() {
        this.showSlides = true;
    }

    close() {
        this.modalCtrl.dismiss();
    }

    handleScroll(event: any) {
        const scrollTop = event.detail.scrollTop;

        // Slide down to go back
        if (scrollTop < 0 && Math.abs(scrollTop) >= 150) {
            this.close();
        }
    }

}
