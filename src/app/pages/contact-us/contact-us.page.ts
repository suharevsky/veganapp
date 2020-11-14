import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UIComponent} from '../../components/ui/ui.component';
import {HttpService} from '../../services/http/http.service';
import {UserService} from '../../services/user/user.service';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
})
export class ContactUsPage implements OnInit {

  constructor(
      public storage: Storage,
      public http: HttpClient,
      public uiComponent: UIComponent,
      public httpService: HttpService,
      public userService: UserService) {


    this.http.get(this.httpService.getSegmentUrl('open_api') + '/contact', this.httpService.setHeaders(true, this.userService))
        .subscribe((data: any) => {
      this.form = data.form;

    }, err => {
      console.log('Oops!');
    });

    this.storage.get('user_data').then(data => {
      if (data.user_id) {
        this.user_id = data.user_id;
        this.logged_in = true;
      }
    });
  }

  // form: any = {};
  public errors: any = {};
  public user_id: any;
  allfields = '';
  public logged_in = false;
  public form: any = {
    email: '',
    text: '',
    subject: '',
  };


  ngOnInit() {
  }

  formSubmit() {

    let isValid = true;
    if (this.form.email.value.trim().length < 7 && !this.logged_in) {
      this.errors.email = 'כתובת אימייל לא תקינה';
      isValid = false;
    }
    if (this.form.subject.value.trim() === '') {
      this.errors.subject = 'נא להזין נושא פניה';
      isValid = false;
    }
    if ( this.form.text.value.trim() === '') {
      this.errors.text = 'נא להזין הודעה';
      isValid = false;
    }

    if (isValid) {
      const params = {
        contact: {
          email: this.user_id ? this.user_id : this.form.email.value,
          text: this.form.text.value,
          subject: this.form.subject.value
        }
      };

      this.http.post(this.httpService.getSegmentUrl('open_api') + '/contacts', params, this.httpService.setHeaders(true, this.userService))
          .subscribe(data => this.validate(data));
    }
  }

  validate(response) {
    console.log(response);
    if (response.send === true) {
      this.form.email.value = '';
      this.form.text.value = '';
      this.form.subject.value = '';

      this.uiComponent.toastCreate('message was sent');

    } else if (!this.errors) {
      this.allfields = 'ooops!';
    } else {
      this.errors.email = response.errors.form.children.email.errors;
      this.errors.subject = response.errors.form.children.subject.errors;
      this.errors.text = response.errors.form.children.text.errors;
    }
  }

}
