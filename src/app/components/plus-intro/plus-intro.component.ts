import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'plus-intro',
  templateUrl: './plus-intro.component.html',
  styleUrls: ['./plus-intro.component.scss']
})
export class PlusIntroComponent implements OnInit {
  slideOpts = {
    autoplay: true,
    delay: 3000
  };
  items: object[] = [];

  constructor() { }

  ngOnInit() {
    this.items = [
      {
        iconName: 'flame-sharp',
        title: 'Get Tinder Gold',
        body: 'See who Likes You & more!'
      },
      {
        iconName: 'flash-sharp',
        title: 'Get Matches Faster',
        body: 'Boost your profile once a month!'
      },
      {
        iconName: 'star-sharp',
        title: 'Stand Out With Super Likes',
        body: `You're 3x more likely to get a match!`
      },
      {
        iconName: 'location-sharp',
        title: 'Swipe Around the World',
        body: 'Passport to anywhere with Tinder Plus!'
      },
      {
        iconName: 'key-sharp',
        title: 'Control Your Profile',
        body: 'Limit what others see with Tinder Plus.'
      },
      {
        iconName: 'refresh-circle-sharp',
        title: 'I Meant to Swipe Right',
        body: 'Get unlimited Rewinds with Tinder Plus!'
      },
      {
        iconName: 'heart-sharp',
        title: 'Increase Your Chances',
        body: 'Get unlimited Likes with Tinder Plus!'
      }
    ]
  }

}
