import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    public header: any;
    public config = {
        versionApi: 'v2',
        language: 'he',
        baseUrl: 'https://polydate.co.il',
        // baseUrl: 'http://localhost:8100'
    };

    constructor() {
    }

    getSegmentUrl(segment: string = ''): string {
        if (segment === '') {
            segment = this.config.baseUrl + '/api/';
        } else {
            segment = this.config.baseUrl + '/open_api/';
        }
        return segment + this.config.versionApi + '/' + this.config.language;
    }

    setHeaders(isAuth = false, user: any = {}, promise = false): object {

        let myHeaders: HttpHeaders = new HttpHeaders();
        myHeaders = myHeaders.append('Content-type', 'application/json; charset=UTF-8');
        // myHeaders = myHeaders.append('Accept', '*/*');
        myHeaders = myHeaders.append('Access-Control-Allow-Origin', '*');

        if (isAuth === true) {
            myHeaders = myHeaders.append('Authorization', 'Basic ' +
                btoa(encodeURIComponent(user.getUsername()) + ':' + encodeURIComponent(user.getPassword())));
        }
        this.header = {
            headers: myHeaders
        };
        if (promise) {
            return new Promise((resolve) => {
                return resolve({
                    header: this.header
                });
            });
        }
        return this.header;
    }
}
