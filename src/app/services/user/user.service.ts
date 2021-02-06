import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private username: string;
    private password: any;
    private user: any;
    private isPay: boolean;
    private mainPhoto: string;

    constructor(
    ) {
    }

    public setUser(user) {
        this.user = user;
    }

    public getMainPhoto() {
        return this.mainPhoto;
    }

    public setMainPhoto(url: string): void {
        this.mainPhoto = url;
    }

    public getIsPay(): boolean {
        return this.isPay;
    }

    public getUserById(id) {
        return this.user;
    }

    public getUser() {
        return this.user;
    }

    public setUsername(username) {
        this.username = username;
    }

    public getUsername() {
        return this.username;
    }

    public setPassword(password) {
        this.password = password;
    }

    public getPassword() {
        return this.password;
    }
}
