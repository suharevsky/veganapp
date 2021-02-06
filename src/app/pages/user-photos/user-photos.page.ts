import {Component, OnInit} from '@angular/core';
import {ImagePicker, ImagePickerOptions} from '@ionic-native/image-picker/ngx';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {FileTransfer, FileUploadOptions, FileTransferObject} from '@ionic-native/file-transfer/ngx';
import {ActionSheetController, AlertController} from '@ionic/angular';
import {Router, ActivatedRoute} from '@angular/router';
import {ChangeDetectorRef} from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {Storage} from '@ionic/storage';
import {HttpService} from '../../services/http/http.service';
import {HttpClient} from '@angular/common/http';
import {UIComponent} from '../../components/ui/ui.component';
import {ConfigService} from '../../services/config/config.service';

/*
Generated class for the ChangePhotos page.
See http://ionicframework.com/docs/v2/he/components/#navigation for more info on
Ionic pages and navigation.
*/
@Component({
    selector: 'user-change-photos',
    templateUrl: 'user-photos.page.html',
    styleUrls: ['user-photos.page.scss'],
    providers: [Camera, FileTransferObject, ImagePicker, FileTransfer]

})
export class UserPhotosPage implements OnInit {

    image: any;
    photos: any;
    username: any;
    password: any;
    newUser = false;
    dataPage: {
        noPhoto: any, texts: any, photos: Array<{
            _id: string, face: string, isValid: string, isMain: boolean, url: any, isPrivate: boolean, statusText: string
        }>
    };
    description: any;

    constructor(
        public storage: Storage,
        public http: HttpClient,
        public httpService: HttpService,
        public changeRef: ChangeDetectorRef,
        public userService: UserService,
        public actionSheetCtrl: ActionSheetController,
        public configService: ConfigService,
        public uiComponent: UIComponent,
        public alertCtrl: AlertController,
        public router: Router,
        public route: ActivatedRoute,
        public camera: Camera,
        public transfer: FileTransfer,
        public imagePicker: ImagePicker
    ) {
    }

    ngOnInit() {

        this.getPageData();
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

    getCount(num) {
        return parseInt(num, 10) + 1;
    }

    getPageData(afterUpload = false) {
        const route = this.httpService.getSegmentUrl() + '/photos/json.json';

        this.http.get(route, this.httpService.setHeaders(true, this.userService)).subscribe((data: any) => {
            if (!afterUpload) {
                const currentPhotoCount = this.photos ? this.photos.length : 0;
                const newPhotoCount = data.photos ? data.photos.length : 0;
                if (currentPhotoCount !== newPhotoCount) {
                    afterUpload = true;
                }
            }

            this.dataPage = data;
            this.description = data.texts.description;
            this.photos = Object.keys(this.dataPage.photos);
            this.changeRef.detectChanges();

            if (this.dataPage.photos) {

                const valid = [];
                let main = false;

                for (const img of this.dataPage.photos) {
                    if (img.isMain) {
                        main = true;
                    }
                    if (img.isValid) {
                        valid.push(img);
                    }
                }
                if (!main && valid.length > 0) {
                    const position = this.dataPage.photos.indexOf(valid[0]);
                    this.dataPage.photos[position].isMain = true;
                    this.postPageData('mainImage', valid[0]);
                }
            }

            if (afterUpload) {
                this.uiComponent.hideLoad();
            }
        }, err => {
            this.uiComponent.toastCreate('error');
        });
    }


    getPage(id) {
        // this.router.navigate(['/page']);
    }

    postPageData(type, params) {// not active

        let data: any;

        if (type === 'privateImage') {
            params.isPrivate = true;
            data = JSON.stringify({setPrivate: params.id});
        } else if (type === 'mainImage') {
            data = JSON.stringify({setMain: params.id});

        } else if ('deletePage') {
            this.uiComponent.showLoad();
            data = JSON.stringify({
                delete: params.id
            });
        }

        const route = this.httpService.getSegmentUrl() + '/photos.json';

        this.http.post(route, data, this.httpService.setHeaders(true, this.userService)).subscribe((result: any) => {
            this.dataPage = result;
            this.photos = Object.keys(this.dataPage.photos);
            this.uiComponent.hideLoad();
        }, err => {
            this.uiComponent.hideLoad();
        });
    }

    edit(photo) {

        const mainOpt = [];

        if (!photo.isMain && photo.isValid) {

            mainOpt.push({
                    text: this.dataPage.texts.set_as_main_photo,
                    icon: 'contact',
                    handler: () => {
                        this.postPageData('mainImage', photo);
                    }
                }
            );
        }
        mainOpt.push({
            text: this.dataPage.texts.delete,
            role: 'destructive',
            icon: 'trash',
            handler: () => {
                this.delete(photo);
            }
        });
        if (!photo.isMain) {
            mainOpt.push({
                text: !photo.isPrivate ? this.dataPage.texts.setPrivate : this.dataPage.texts.unsetPrivate,
                role: 'destructive',
                icon: 'eye-sharp',
                handler: () => {
                    this.postPageData('privateImage', photo);
                }
            });
        }
        mainOpt.push({
            text: this.dataPage.texts.cancel,
            role: 'destructive',
            icon: 'close',
            handler: () => {
               // console.log('Cancel clicked');
            }
        });

        const status = photo.isValid ? this.dataPage.texts.approved : this.dataPage.texts.waiting_for_approval;
        this.lightSheet(mainOpt, status);
    }

    async lightSheet(mainOpt = [], status) {
        const actionSheet = await this.actionSheetCtrl.create({
            header: 'ערוך תמונה',

            subHeader: this.dataPage.texts.status + ': ' + status,

            buttons: mainOpt
        });
        await actionSheet.present();
    }

    add() {
        this.actionSheetCtrl.create({
            header: this.dataPage.texts.add_photo,
            buttons: [
                {
                    text: this.dataPage.texts.choose_from_camera,
                    icon: 'aperture',
                    handler: () => this.openCamera()
                }, {
                    text: this.dataPage.texts.choose_from_gallery,
                    icon: 'photos',
                    handler: () => this.openGallery()
                }, {
                    text: this.dataPage.texts.cancel,
                    role: 'destructive',
                    icon: 'close',
                }
            ]
        }).then(toast => toast.present());

    }

    openGallery() {
        if (this.checkIfMax()) {
            return;
        }
        const options: ImagePickerOptions = {
            maximumImagesCount: 1,
            width: 600,
            height: 600,
            quality: 100
        };

        this.imagePicker.getPictures({maximumImagesCount: 1}).then(
            (fileURIs) => {
                this.uploadPhoto(fileURIs[0]);
            },

            (err) => {
                console.log(err);
            }
        );
    }

    checkIfMax() {
        if (this.photos.length > 7 || (this.userService.getIsPay() && this.photos.length > 15)) {
            const text = this.userService.getIsPay() ? 'ניתן לעלות עד 16 תמונות' : 'ניתן לעלות עד 8 תמונות';
            this.uiComponent.toastCreate(text);
            return true;
        }
        return false;
    }

    openCamera() {
        if (this.checkIfMax()) {
            return;
        }

        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            cameraDirection: this.camera.Direction.FRONT,
            targetWidth: 900,
            targetHeight: 600,
            allowEdit: true,
            sourceType: 1
        };

        this.camera.getPicture(options).then((imageData) => {
            this.uiComponent.showLoad();
            this.uploadPhoto(imageData);
        }, (err) => {
            console.log('image data error: ' + err);
        });
    }

    safeHtml(el): any {
        const html = this.description;
        const div: any = document.createElement('div');
        div.innerHTML = html;
        [].forEach.call(div.getElementsByTagName('a'), (a) => {
            const pageHref = a.getAttribute('click');
            if (pageHref) {
                a.removeAttribute('click');
                a.onclick = () => this.getPage(pageHref);
            }
        });
        if (el.innerHTML === '') {
            el.appendChild(div);
        }
    }

    uploadPhoto(url) {
        this.uiComponent.showLoad();
        const options: FileUploadOptions = {
            fileKey: 'photo',
            fileName: 'test.jpg',
            chunkedMode: false,
            mimeType: 'image/jpg',
            headers: {
                Authorization: 'Basic ' + btoa(encodeURIComponent(
                    this.userService.getUsername()
                ) + ':' + this.userService.getPassword()), version: this.configService.getApiVersion()
            }
        };

        const route = this.httpService.getSegmentUrl() + '/photos.json';

        const fileTransfer: FileTransferObject = this.transfer.create();
        fileTransfer.upload(url, encodeURI(route), options).then((entry: any) => {
            console.log(entry);
            if (entry.response.errorMessage) {
                this.uiComponent.toastCreate(entry.response.errorMessage);
                this.uiComponent.hideLoad();
            } else {
                this.getPageData(true);
            }

        }, (err) => {
            this.uiComponent.hideLoad();
        });
    }

    setPrivate(userPhoto) {
        const data = {
            action: userPhoto.isPrivate ? 'private' : 'unprivate',
            photo: userPhoto.id,
        };

        const route = this.httpService.getSegmentUrl() + '/photos/privates';

        this.http.get(route, this.httpService.setHeaders(true, this.userService)).subscribe((result: any) => {
            if (result.success) {
                this.getPageData();
            }
        });
    }

    onHomePage() {
        this.router.navigate(['/home']);
    }
}
