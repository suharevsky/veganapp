import { Component, OnInit, ViewChild } from '@angular/core';
import {IonContent, ModalController} from '@ionic/angular';
import {Router, NavigationExtras} from '@angular/router';
// import {SelectModalPage} from '../select-modal/select-modal.page';
import {HttpClient} from '@angular/common/http';
import {HttpService} from '../../services/http/http.service';
import {UserService} from '../../services/user/user.service';
@Component({
  selector: 'app-filter-results',
  templateUrl: './filter-results.page.html',
  styleUrls: ['./filter-results.page.scss'],
})
export class FilterResultsPage implements OnInit {

  @ViewChild(IonContent, {static: false}) content: IonContent;

  usersChooses: any = {};
  age: any;
  distance: any = {
    value: 200,
    isActive: true
  };
  form: any;

  ageLower: any = 20;
  ageUpper: any = 50;

  ngOnInit() {
  }

  constructor(
      public router: Router,
      public modalCtrl: ModalController,
      public http: HttpClient,
      public userService: UserService,
      public httpService: HttpService
  ) {

    this.http.get( this.httpService.getSegmentUrl() + '/search?advanced=0',
        this.httpService.setHeaders(true, this.userService) ).subscribe(data => {
      /*this.age = {
        lower: 18,
        upper: 100
      };*/
      this.form = data;
      this.form.ageFrom.label = 'Age From';
      this.form.ageTo.label = 'To';

      this.age = {
        lower: this.form.ageFrom.value,
        upper: this.form.ageTo.value
      };
    }, err => {
      console.log('Oops!');
    });

  }

  getAge(e) {
    this.age = e.detail.value;
  }

  getDistance(e) {
    this.distance.value = e.detail.value;
    console.log(this.distance);
  }

  toSearchResultsPage(searchType) {
    let params;
    // tslint:disable-next-line:triple-equals
    if ( searchType == 'search-form-1' ) {
      params = JSON.stringify({
        action: 'search',
        filter: 'lastActivity',
        quick_search: {
          region: this.form.region.value,
          ageFrom: this.form.ageFrom.value,
          ageTo: this.form.ageTo.value,
          gender: this.form.gender.value,
          lookingFor: this.form.lookingFor.value,
        }
      });

    } else {
      params = JSON.stringify({
        action: 'search',
        filter: 'lastActivity',
        quick_search: {
          username: this.form.username.value
        }
      });
    }

    const navigationExtras: NavigationExtras = {
      queryParams: {
        params
      }
    };
    this.router.navigate(['/home'], navigationExtras);
  }

  toAdvancedPage() {
    this.router.navigate(['/advanced-search']);
  }

  close() {
    this.modalCtrl.dismiss();
  }

}
