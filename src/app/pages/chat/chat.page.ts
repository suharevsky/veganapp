import {Component, OnInit, ViewChild} from '@angular/core';
import {IonContent, ModalController, NavParams} from '@ionic/angular';
import {UserService} from '../../services/user/user.service';
import {HttpClient} from '@angular/common/http';
import {HttpService} from '../../services/http/http.service';
import {ConfigService} from '../../services/config/config.service';
import {UIComponent} from '../../components/ui/ui.component';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.page.html',
    styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
    messages: any[];
    typingMessage = '';
    showGiphy = false;
    page: any = 1;
    receiver: any;
    checkChat: any;
    notReadMessage: any = [];
    allowedToReadMessage: any;
    messData: any;

    @ViewChild(IonContent, {static: false}) content: IonContent;

    constructor(
        public userService: UserService,
        public configService: ConfigService,
        public http: HttpClient,
        public httpService: HttpService,
        public modalCtrl: ModalController,
        public uiComponent: UIComponent
    ) {
        this.init();
    }

    init() {
        // TODO: can be your API response
        // this.messages = MESSAGES;
    }
    ngOnInit() {
        this.scrollToBottom(null, true);
        this.getData();

        const that = this;
        this.checkChat = setInterval(() => {
            that.getNewMessages();
        }, 10000);
    }

    getNewMessages() {

        let messageData = '';
        for (let i = 0; i < this.notReadMessage.length; i++) {
            messageData += messageData === '' ? this.notReadMessage[i] : ', ' + this.notReadMessage[i];
        }

        this.http.get(this.httpService.getSegmentUrl() + '/chats/' + this.receiver.id + '/new/messages?notReadMess=' + messageData,
            this.httpService.setHeaders(true, this.userService)).subscribe((data: any) => {

            if (data.lastIsRead) {
                const ids = [];
                ids.push(data.lastIsRead.map((vel) => {
                    return vel.MessageId;
                }));

                this.messages.filter((obj) => {
                    if (ids[0].includes(obj.id)) {
                        obj.isRead = true;
                        this.notReadMessage.splice(this.notReadMessage.indexOf(obj.id), 1);
                    }
                });
            }

            if (data.newMessages && data.newMessages.length > 0) {
                let isRead = '';
                for (const message of data.newMessages) {
                    isRead += message.id + ', ';
                    if (this.allowedToReadMessage) {
                        for (let y = this.messages.length - 1, x = 0; x < this.notReadMessage.length; x++, y--) {
                            this.messages[y].isRead = true;
                        }
                        this.notReadMessage = [];
                    }
                    this.messages.push(message);
                    this.scrollToBottom(300);
                }
                const params = JSON.stringify({
                    messages_id: isRead
                });

                this.http.post(this.httpService.getSegmentUrl() + '/reads/' + this.receiver.id + '/messages', params,
                    this.httpService.setHeaders(true, this.userService));
            }
        });

    }

    getData() {
        this.receiver = this.userService.getUser();

        this.http.get(this.httpService.getSegmentUrl() + '/dialogs/' + this.receiver.id + '?per_page=30&page=' + this.page,
            this.httpService.setHeaders(true, this.userService)).subscribe((data: any) => {
            this.messages = data.history;
        });

    }

    onSubmitMessage(message: any) {

        this.messages.push({
            isSender: true,
            type: message.type, // 'text' or 'image'
            text: message.type.toUpperCase() === 'IMAGE' ? message.imageUrl : message.message,
            dateTime: 'Nov 25, 2019 9:55am'
        });

        const params: any = {
            message: message.message,
        };

        this.http.post(this.httpService.getSegmentUrl() + '/sends/' + this.receiver.id + '/messages', params,
            this.httpService.setHeaders(true, this.userService)).subscribe((data: any) => {
            if (data.message) {
                this.sendPush();
                data.message.delivered = true;
                this.messages[this.messData.message.messPoss] = data.message;
                this.allowedToReadMessage = true; // data.allowedToReadMessage;
                this.notReadMessage.push(data.message.id);
                this.scrollToBottom(150);
            } else {
                this.uiComponent.toastCreate(data.errorMessage);
                this.messages.splice(this.messData.message.messPoss, 1);
            }
        });
    }

    sendPush() {
        this.http.post(this.httpService.getSegmentUrl() + '/sends/' + this.receiver.id + '/pushes', {},
            this.httpService.setHeaders(true, this.userService)).subscribe(data => {
        });
    }

    scrollToBottom(duration = 500, isFirstLoad = false) {
        // this.content.resize();
        if (isFirstLoad) {
            setTimeout(() => {
                this.content.scrollToBottom(duration);
            }, 500);
        } else {
            this.content.scrollToBottom(duration);
        }
    }

    onInputSizeChange() {
        setTimeout(() => {
            this.scrollToBottom();
        }, 0);
    }

    findIndexByKeyValue(arraytosearch, key, valuetosearch) {
        for (let i = 0; i < arraytosearch.length; i++) {
            if (arraytosearch[i][key] === valuetosearch) {
                return i;
            }
        }
        return null;
    }

    useFreePointToReadMessage(message) {
        const index = this.findIndexByKeyValue(this.messages, 'id', message.id);
        this.http.get(this.httpService.getSegmentUrl() + '/chats/' + message.id + '/use/free/point/to/read/message.json',
            this.httpService.setHeaders(true, this.userService)).subscribe((data: any) => {
            this.messages[index].text = data.messageText;
            if (!data.userHasFreePoints) {
                for (const msg of this.messages) {
                    msg.hasPoints = 0;
                }
            }
        });
    }

    ionViewWillLeave() {
        clearInterval(this.checkChat);
    }

    close() {
        this.modalCtrl.dismiss();
    }
}
