import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'random-avatar',
  templateUrl: './random-avatar.component.html',
  styleUrls: ['./random-avatar.component.scss'],
})
export class RandomAvatarComponent implements OnInit {
  @Input() size: string = '';// Can be 'xs'-'sm'-'md'-'lg'
  @Input() customSize: number = null;

  images: any[] = [
    'assets/img/avatars/hieu.png',
    'assets/img/avatars/captain.png',
    'assets/img/avatars/blackpanther.png',
    'assets/img/avatars/blackwidow.png',
    'assets/img/avatars/ironman.png',
    'assets/img/avatars/spiderman.png',
    'assets/img/avatars/hulk.png',
    'assets/img/avatars/scarwitch.png',
    'assets/img/avatars/thor.png',
    'assets/img/avatars/thanos.png'
  ];
  imageUrl: string;

  constructor() {
    let randomIndex = Math.floor(Math.random() * (this.images.length - 1));
    this.imageUrl = `${this.images[randomIndex]}`;
  }

  ngOnInit() {}

}
