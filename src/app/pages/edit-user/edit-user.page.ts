import {Component, OnInit} from '@angular/core';
import {AlertController, LoadingController} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {HttpService} from '../../services/http/http.service';
import {UserService} from '../../services/user/user.service';

@Component({
    selector: 'app-edit-user',
    templateUrl: './edit-user.page.html',
    styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {

    image: any;
    photos: any;
    imagePath: any;
    username: any;
    password: any;
    checkImages: any;
    dataPage: {
        noPhoto: any, texts: any,
        photos: Array<{ _id: string, face: string, isValid: string, isMain: boolean, url: any, isPrivate: boolean, statusText: string }>
    };
    description: any;

    constructor(
        public alertCtrl: AlertController,
        public http: HttpClient,
        public httpService: HttpService,
        public  userService: UserService,
        public loadingController: LoadingController
    ) {
    }

    ngOnInit() {
    }

    getData() {

    }

    delete(photo) {
        this.alertCtrl.create({
            header: this.dataPage.texts.deletePhoto,
            //  message: 'This is an alert message.',
            buttons: [{
                text: 'כן',
                handler: () => {
                    this.postPageData('deleteImage', photo);
                }
            },
                {
                    text: 'לא',
                }]
        }).then(confirm => confirm.present());
    }

    postPageData(type, params) {// not active
        let data;
        if (type === 'privateImage') {
            params.isPrivate = true;
            data = JSON.stringify({setPrivate: params.id});
        } else if (type === 'mainImage') {
            console.log('Param', params);
            data = JSON.stringify({setMain: params.id});

        } else if ('deletePage') {
            this.presentLoading();

            data = JSON.stringify({
                delete: params.id
            });
        }

        this.http.post(this.httpService.getSegmentUrl() + '/photos.json', data,
            this.httpService.setHeaders(true, this.userService)).subscribe((data: any) => {
            this.dataPage = data;
            this.photos = Object.keys(this.dataPage.photos);
            this.loadingController.dismiss();
            console.log(this.photos);
        }, err => {
            console.log('Oops!');
            this.loadingController.dismiss();
        });
    }

    async presentLoading() {
        const loading = await this.loadingController.create({
            cssClass: 'my-custom-class',
            message: 'Please wait...',
            duration: 2000
        });
        await loading.present();

        const {role, data} = await loading.onDidDismiss();
        console.log('Loading dismissed!');
    }
}
