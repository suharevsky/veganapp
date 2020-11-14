import {Component, OnInit, ViewChild} from '@angular/core';
import {IonSlides} from '@ionic/angular';

@Component({
    selector: 'app-register-steps',
    templateUrl: './register-steps.page.html',
    styleUrls: ['./register-steps.page.scss'],
})

export class RegisterStepsPage implements OnInit {

    // @ts-ignore
  @ViewChild('slides') slides: IonSlides;

    public user = {
        name: {
            focus: '',
            value: ''
        },
        password: {
            focus: '',
            value: '',
            type: 'password'
        },
        email: {
            focus: '',
            value: ''
        }
    };

    slideOpts = {
        initialSlide: 3,
        speed: 400
    };

    constructor() {
        // this.slides.
    }

    inputType(bool: boolean) {
      if (bool === true ) {
        this.user.password.type = 'password';
      } else {
        this.user.password.type = 'text';
      }
    }

    ngOnInit() {
    }

    slideNext() {
        this.slides.slideNext(300);
    }

}
