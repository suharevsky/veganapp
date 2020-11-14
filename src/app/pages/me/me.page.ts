import {Component, OnInit} from '@angular/core';
import {NavController, ModalController} from '@ionic/angular';
import {ProfilePage} from '../profile/profile.page';
import {ProfileEditPage} from '../profile-edit/profile-edit.page';
import {TinderGoldPage} from '../tinder-gold/tinder-gold.page';
import {UserService} from '../../services/user/user.service';
import {Router} from '@angular/router';
import {RouterService} from '../../services/router.service';

@Component({
    selector: 'app-me',
    templateUrl: './me.page.html',
    styleUrls: ['./me.page.scss'],
})
export class MePage implements OnInit {

    constructor(
        private navCtrl: NavController,
        private modalCtrl: ModalController,
        public userService: UserService,
        public router: Router,
        public routerService: RouterService,
    ) {
    }

    ngOnInit() {

    }

    getPage(page, params: object = {}) {
        this.routerService.setParams(params);
        this.router.navigate(['/' + page + '']);
    }

    async viewProfile() {
        const user = {
            id: 1,
            name: 'Hieu Pham',
            age: 31,
            job_title: 'UX/UI lover',
            profile_image_url: 'assets/img/avatars/hieu.png'
        };

        const modal = await this.modalCtrl.create({
            component: ProfilePage,
            componentProps: {
                user
            }
        });
        return await modal.present();
    }

    logout() {
        this.navCtrl.navigateForward('/landing', {animated: false});
    }

    async viewSettings() {
        /*const modal = await this.modalCtrl.create({
            component: SettingsPage
        });
        return await modal.present();*/
        this.navCtrl.navigateForward('/settings');

    }

    async viewEditProfile() {
        const modal = await this.modalCtrl.create({
            component: ProfileEditPage
        });
        return await modal.present();
    }

    async viewTinderGold() {
        const modal = await this.modalCtrl.create({
            component: TinderGoldPage,
            cssClass: 'custom-modal-small',
        });
        return await modal.present();
    }

}
