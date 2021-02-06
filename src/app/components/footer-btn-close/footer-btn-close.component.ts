import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-footer-btn-close',
  templateUrl: './footer-btn-close.component.html',
  styleUrls: ['./footer-btn-close.component.scss'],
})
export class FooterBtnCloseComponent implements OnInit {

  constructor(private navCtrl: NavController) { }


  back() {
    this.navCtrl.back();
  }

  ngOnInit() {}

}
