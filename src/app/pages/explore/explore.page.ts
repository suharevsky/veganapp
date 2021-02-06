import {Component, OnInit, ElementRef} from '@angular/core';
import {NavController, ModalController} from '@ionic/angular';
import {MatchedModalPage} from '../matched-modal/matched-modal.page';
import {ProfilePage} from '../profile/profile.page';
import {modalEnterZoomOut, modalLeaveZoomIn} from '../../animations/animations';
import {RouterService} from '../../services/router.service';
import {HttpClient} from '@angular/common/http';
import {HttpService} from 'src/app/services/http/http.service';
import {UserService} from 'src/app/services/user/user.service';
import stackedCards, {subject} from '../../components/stackedCards';
import {TinderGoldPage} from '../tinder-gold/tinder-gold.page';
import {FilterResultsPage} from '../filter-results/filter-results.page';
import {Router} from '@angular/router';
import {IUser} from '../../interfaces/user';

@Component({
    selector: 'app-explore',
    templateUrl: './explore.page.html',
    styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {
    users: IUser[];
    currentUser: any;
    isLoading = true;
    segmentView = 'swiping';
    resultsLoader: any = true;
    boostView = 'likes';
    paramsStr: any;
    params: any = {action: 'search', filter: 'new', page: 1, list: ''};
    cards: any;

    constructor(
        public modalCtrl: ModalController,
        private navCtrl: NavController,
        private routerService: RouterService,
        private elementRef: ElementRef,
        private http: HttpClient,
        public userService: UserService,
        public httpService: HttpService,
        public router: Router,
    ) {
    }

    ngOnInit() {
        if ( this.routerService.getParams()) {
            // @ts-ignore
            this.params = { action: '', filter: 'lastActivity', page: 1, list: this.routerService.getParams().list,
                usersCount: 20, searchparams:
                    {region: '', agefrom: 0, ageto: 0, userNick: ''}
            };
        }
        this.params.page = 1;

        this.getData();

        // this.getLocation();
    }

    moreUsers(event) {
        if (this.resultsLoader) {
            this.params.page++;
            if (!this.params.page) {
                this.params.page = 2;
            }
            this.paramsStr = JSON.stringify(this.params);
            const route = this.httpService.getSegmentUrl() + '/users/results';
            this.http.post(route, this.paramsStr, this.httpService.setHeaders(true, this.userService))
                .subscribe((data: any) => {
                    if (data.users.length < 10) {
                        this.resultsLoader = false;
                    }
                    for (const person of data.users) {
                        this.users.push(person);
                    }

                    event.target.complete();
                });
        }
    }

    getLocation() {
        /*this.geolocation.getCurrentPosition().then(pos => {
        });*/
    }

    onSegmentChange() {
        if (this.segmentView === 'swiping') {
            this.getData();
            this.isLoading = true;
        }
    }

    ionViewDidEnter() {
        this.routerService.toggleSwipeBack(false);
    }

    ionViewWillLeave() {
        this.routerService.toggleSwipeBack(true);
    }

    goToMe() {
        this.navCtrl.navigateBack('/me');
    }

    goToMatches() {
        this.navCtrl.navigateForward('/matches', {animated: false});
    }

    async viewTinderGold() {
        const modal = await this.modalCtrl.create({
            component: TinderGoldPage,
            cssClass: 'custom-modal-small',
        });
        return await modal.present();
    }

    getPage(page: string) {
        this.router.navigate(['/' + page]);
    }

    getData() {
        this.paramsStr = JSON.stringify(this.params);
        // tslint:disable-next-line:variable-name
        const user_id = null;
        const route = this.httpService.getSegmentUrl() + '/users/results';

        const params = JSON.stringify({
            action: 'arena',
            user_id
        });

        this.http.post(route, params, this.httpService.setHeaders(true, this.userService)).subscribe(() => {
            // API call goes here
            setTimeout(() => {
                this.elementRef.nativeElement.querySelector(`div.stackedcards`)
                    .addEventListener('click', this.viewProfile.bind(this));
                this.cards = stackedCards();
                this.isLoading = false;
                // We only need 2 cards visible on the card stack UI
            }, 2000);
        }, () => {
            this.navCtrl.navigateBack('/landing');
        });

        this.http.post(route, this.paramsStr, this.httpService.setHeaders(true, this.userService)).subscribe((data: any) => {
            this.users = data.users;
        }, () => {
            this.navCtrl.navigateBack('/landing');
        });
    }

    async filterResults() {
        const modal = await this.modalCtrl.create({
            component: FilterResultsPage,
            cssClass: 'custom-modal-small',
        });
        return await modal.present();
    }

    async checkMatching(card: any) {
        if (card.name === 'Hieu Pham') {

            const modal = await this.modalCtrl.create({
                component: MatchedModalPage,
                enterAnimation: modalEnterZoomOut,
                leaveAnimation: modalLeaveZoomIn,
                componentProps: {
                    user: card
                }
            });
            return await modal.present();
        }
    }

    async viewProfile(user = {
        id: 0
    }) {

        console.log(user);

        subject.subscribe({
            next: (i) => {
                console.log(i);
                this.currentUser = this.users[i];
            }
        });

        if (user.id > 0) {
            this.currentUser = user;
        }
        const modal = await this.modalCtrl.create({
            component: ProfilePage,
            componentProps: {
                user: this.currentUser
            }
        });
        return await modal.present();
    }
}
