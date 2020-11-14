import {Component, OnInit} from '@angular/core';
import {ConfigService} from '../../services/config/config.service';
import {HttpClient} from '@angular/common/http';
import {HttpService} from '../../services/http/http.service';
import {UserService} from '../../services/user/user.service';
import {UIComponent} from '../../components/ui/ui.component';

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.page.html',
    styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

    form: any = {is_sent_email: '', is_sent_push: ''};

    constructor(
        public configService: ConfigService,
        public http: HttpClient,
        public httpService: HttpService,
        public userService: UserService,
        public uiComponent: UIComponent
    ) {
    }

    ngOnInit() {
        this.getData();
    }

    getData() {
        const route = this.httpService.getSegmentUrl() + '/settings';

        this.http.post(route, {}, this.httpService.setHeaders(true, this.userService)).subscribe((data: any) => {
            this.form = data.form;
        }, err => {
            console.log('Oops!');
        });
    }

    submit() {

        const params = JSON.stringify({
            is_sent_email: this.form.is_sent_email.value,
            is_sent_push: this.form.is_sent_push.value
        });

        const route = this.httpService.getSegmentUrl() + '/settings';

        this.http.post(route, params, this.httpService.setHeaders(true, this.userService)).subscribe((data: any) => {
        }, err => {
            console.log('Oops!');
        });
    }
}
