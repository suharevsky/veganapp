import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    private baseUrl = 'https://www.polydate.co.il/';
    private apiVersion = 'v3';

    constructor() {
    }

    getBaseUrl() {
        return this.baseUrl;
    }

    getApiVersion() {
        return this.apiVersion;
    }

}
