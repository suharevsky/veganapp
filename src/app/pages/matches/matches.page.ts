import {Component, OnInit} from '@angular/core';
import {ModalController, NavController} from '@ionic/angular';
import {RouterService} from '../../services/router.service';
import {HttpService} from 'src/app/services/http/http.service';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from 'src/app/services/config/config.service';
import {UserService} from 'src/app/services/user/user.service';
import {TinderGoldPage} from '../tinder-gold/tinder-gold.page';
import {ChatPage} from '../chat/chat.page';

@Component({
    selector: 'app-matches',
    templateUrl: './matches.page.html',
    styleUrls: ['./matches.page.scss'],
})
export class MatchesPage implements OnInit {

    public dialogues: any;
    public matches: any;
    public matchesResults: any;
    segmentView = '0';


    constructor(
        private navCtrl: NavController,
        private routerService: RouterService,
        public httpService: HttpService,
        private http: HttpClient,
        public configService: ConfigService,
        private userService: UserService,
        public modalCtrl: ModalController,
    ) {
    }

    ngOnInit() {
        this.getData();
    }

    searchMatch(evt) {

        const searchTerm = evt.srcElement.value;
        if (!searchTerm) {
            return;
        }

        this.matchesResults = this.matches.filter(currentMatch => {
            if (currentMatch.username && searchTerm) {
                return (currentMatch.username.toLowerCase().indexOf(searchTerm) > -1);
            }
        });
    }

    getData() {
        this.http.get(this.httpService.getSegmentUrl() + '/inbox', this.httpService.setHeaders(true, this.userService))
            .subscribe((data: any) => {
                this.dialogues = data.dialogs;
            }, err => {
            });

        this.http.post(this.httpService.getSegmentUrl() + '/notifications.json',
            {}, this.httpService.setHeaders(true, this.userService)).subscribe((data: any) => {
            this.matches = data.users;
            this.matchesResults = this.matches;
        }, err => {
            console.log('Oops!');
        });
    }

    ionViewDidEnter() {
        this.routerService.toggleSwipeBack(false);
    }

    ionViewWillLeave() {
        this.routerService.toggleSwipeBack(true);
    }

    goToExplore() {
        this.navCtrl.navigateBack('/explore');
    }

    async goToChat(user) {
        user.id = (typeof user.user_id !== 'undefined') ? user.user_id : user.id;
        this.userService.setUser(user);
        const modal = await this.modalCtrl.create({
            component: ChatPage,
        });
        return await modal.present();
    }
}
