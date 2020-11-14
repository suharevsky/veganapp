import {Component, OnInit} from '@angular/core';
import {LoadingController, ToastController} from '@ionic/angular';

@Component({
    selector: 'app-ui',
    templateUrl: './ui.component.html',
    styleUrls: ['./ui.component.scss'],
})
export class UIComponent implements OnInit {

    isLoading = false;

    constructor(
        public toastCtrl: ToastController,
        public loadingCtrl: LoadingController
    ) {
    }

    ngOnInit() {
    }

    async toastCreate(mess, duration = 10000) {
        const toast = await this.toastCtrl.create({
            message: mess,
            duration,
            animated: true
        });
        await toast.present();
    }

    focusIn() {
        console.log(111);

        const footerClass = document.querySelector('.footer') as HTMLElement;
        const headerClass = document.querySelector('.header') as HTMLElement;

        footerClass.style.display = 'none';
        headerClass.style.display = 'none';
    }

    focusOut() {
        console.log(123);
        const footerClass = document.querySelector('.footer') as HTMLElement;
        const headerClass = document.querySelector('.header') as HTMLElement;

        footerClass.style.display = '';
        headerClass.style.display = '';
    }

    async showLoad(text = 'אנא המתן...') {
        if (!this.isLoading) {
            this.isLoading = true;
            return await this.loadingCtrl.create({
                message: text,
            }).then(a => {
                a.present().then(() => {
                    if (!this.isLoading) {
                        a.dismiss();
                    }
                });
            });
        }
    }

    async hideLoad() {
        if (this.isLoading) {
            this.isLoading = false;
            return this.loadingCtrl.dismiss();
        }
    }

}
