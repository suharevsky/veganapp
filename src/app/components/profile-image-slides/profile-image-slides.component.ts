import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { TapticEngine } from '@ionic-native/taptic-engine/ngx';
import {ConfigService} from '../../services/config/config.service';

@Component({
  selector: 'profile-image-slides',
  templateUrl: './profile-image-slides.component.html',
  styleUrls: ['./profile-image-slides.component.scss']
})
export class ProfileImageSlidesComponent implements OnInit {
  activeIndex: number = 0;
  currentEnd: number = -1;
  @Input() images: any[] = [];
  @Input() isClickable: boolean = false;
  @Output() onNoMoreSlide = new EventEmitter();
  @ViewChild('profileImages', {static: false}) slides: IonSlides;

  constructor(private taptic: TapticEngine, public configService: ConfigService) {

  }

  ngOnInit() {
    console.log(this.images);
  }

  onSlideChange() {
    this.slides.getActiveIndex()
      .then(index => {
        this.activeIndex = index;
      });
  }

  moveSlide(step: number = 1) {
    if (step === -1) {
      this.slides.slidePrev();
    } else if (step === 1) {
      this.slides.slideNext();
    }

    if (step === this.currentEnd) {
      // Could not go next or prev
      this.onNoMore(this.currentEnd === -1);
    } else {
      this.currentEnd = 0;
      this.taptic.selection();
    }
  }

  onNoMore(isOnTheLeft: boolean) {
    this.onNoMoreSlide.emit(isOnTheLeft);
    this.taptic.notification({type: 'warning'});
  }

  onReachStart() {
    this.currentEnd = -1;
  }

  onReachEnd() {
    this.currentEnd = 1;
  }

}
