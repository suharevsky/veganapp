import { Component, OnInit, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';

import USERS from '../explore/users.dummy';;

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {
  segmentView = '0';
  profileImages: any[] = [];
  meData: object = USERS[0];
  showSlides: boolean = false;
  aboutMe: string = `I'm obsessed with building mobile apps with Ionic Framework. What about you?`;

  constructor(public modalCtrl: ModalController, private elementRef: ElementRef) {

  }

  ngOnInit() {
    this.profileImages = [
      { imageUrl: 'assets/img/people/hieu.png' },
      { imageUrl: 'assets/img/people/thanos.png' },
      { imageUrl: 'assets/img/people/captain.png' },
      { imageUrl: 'assets/img/people/thor.png' },
    ]
  }

  // Known issue of using ion-slides in a modal template
  // https://github.com/ionic-team/ionic/issues/17522#issuecomment-557890661
  ionViewDidEnter() {
    this.showSlides = true;
  }

  close() {
    this.modalCtrl.dismiss();
  }

  onNoMoreSlide(isOnTheLeft: boolean) {
    const stack = this.elementRef.nativeElement.querySelector('.card-border');
    const className = isOnTheLeft ? 'rotate-left' : 'rotate-right';

    stack.classList.toggle(className);
    setTimeout(() => {
      stack.classList.toggle(className);
    }, 250);
  }

}
