import { Component, OnInit } from '@angular/core';
import {AlertController, ModalController, NavController} from '@ionic/angular';
import { ThemeService } from '../../services/theme/theme.service';
import {Storage} from '@ionic/storage';
import {HttpClient} from '@angular/common/http';
import {HttpService} from '../../services/http/http.service';
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  distance = 30;
  ageRange: any = {
    lower: 20,
    upper: 30
  };
  isDark: boolean;

  constructor(
      public modalCtrl: ModalController,
      private navCtrl: NavController,
      private storage: Storage,
      private themeService: ThemeService,
      public alertController: AlertController,
      public httpService: HttpService,
      public http: HttpClient,
      public userService: UserService
      ) {

  }

  ngOnInit() {
    this.themeService.getCurrentSetting()
      .then(val => {
        this.isDark = val;
      });
  }

  close() {
    this.modalCtrl.dismiss();
  }

  getPage(page) {
    this.navCtrl.navigateForward('/' + page);
  }

  freeze() {
    this.alertConfirm('Are You Sure You Want To Freeze Account?', 'freeze');
  }

  async alertConfirm(message, option) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.storage.remove('user_data').then(() => {
              this.close();
              if (option === 'freeze') {
                const params = JSON.stringify({
                  freeze_account_reason: ''
                });
                this.http.post(this.httpService.getSegmentUrl() + '/freezes', params, this.httpService
                    .setHeaders(true, this.userService)).subscribe((data: any) => {console.log(data)});
              }
              this.navCtrl.navigateBack('/landing');
            });
          }
        }
      ]
    });

    await alert.present();

  }

  logout() {
    this.alertConfirm('Are You Sure You Want To Freeze Account?', 'logout');
  }

  toggleDarkTheme(isDark: boolean) {
    this.themeService.toggleDarkMode(isDark);
  }

}
