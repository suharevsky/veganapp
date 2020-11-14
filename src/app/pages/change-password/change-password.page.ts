import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../services/http/http.service';
import {HttpClient} from '@angular/common/http';
import {Storage} from '@ionic/storage';
import {UIComponent} from '../../components/ui/ui.component';
import {UserService} from '../../services/user/user.service';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.page.html',
    styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

    form: any = {
        oldPassword: '',
        password: {
            first: '',
            second: '',
        }
    };

    errors: any = {
        oldPassword: '',
        password: {
            first: '',
            second: '',
        }
    };

    constructor(
        public httpService: HttpService,
        public http: HttpClient,
        public storage: Storage,
        public uiComponent: UIComponent,
        public userService: UserService
    ) {

    }

    ngOnInit() {
        this.getData();
    }

    getData() {
        this.http.post(this.httpService.getSegmentUrl() + '/passwords', {},
            this.httpService.setHeaders(true, this.userService)).subscribe((data: any) => {
            this.form = data.form;
        }, err => {
            console.log('Oops!');
        });
    }

    formSubmit(form) {
        this.errors.oldPassword = this.errors.firstPass = this.errors.secondPass = '';
        console.log(form);
        let isValid = true;
        if (this.form.oldPassword.value.length < 7) {
            this.errors.oldPassword = 'סיסמה ישנה שגויה';
            isValid = false;
        }
        if (this.form.password.first.value.length < 7) {
            this.errors.firstPass = 'הסיסמה החדשה צריכה להכיל לפחות 7 תווים';
            isValid = false;
        }
        if (this.form.password.second.value !== this.form.password.first.value) {
            this.errors.secondPass = 'סיסמאות לא תואמות';
            isValid = false;
        }
        if (isValid) {
            const params = {
                change_password: {
                    // _token: this.form._token.value,
                    oldPassword: this.form.oldPassword.value,
                    password: {
                        first: this.form.password.first.value,
                        second: this.form.password.second.value
                    },
                }
            };
            this.http.post(this.httpService.getSegmentUrl() + '/passwords', params, this.httpService.setHeaders(true))
                .subscribe(data => this.validate(data));
        }
    }

    validate(response: any) {
        this.errors.oldPassword = response.errors.form.children.oldPassword.errors;
        this.errors.firstPass = response.errors.form.children.password.children.first.errors;
        this.errors.secondPass = response.errors.form.children.password.children.second.errors;

        if (response.changed === true) {

            this.storage.get('user_data').then(data => {
                data.password = this.form.password.first.value;
                this.storage.set('user_data', data);
            });

            this.userService.setPassword(this.form.password.first.value);
            // this.api.setHeaders(true, '', this.form.password.first.value);

            this.form.password.first.value = '';
            this.form.password.second.value = '';
            this.form.oldPassword.value = '';

            this.uiComponent.toastCreate('סיסמה עודכנה בהצלחה');
        } else {
            this.form = response.form;
        }
    }
}
