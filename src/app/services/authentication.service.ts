import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Storage } from '@ionic/storage';
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(
        private storage: Storage,
        private http: HttpClient
    ) {}

    async getLocalUser() {
        let local = localStorage.getItem('user')
        let user = null;

        if(local) {
            user = JSON.parse(local)
        }
    
        return user;
    }
    

    async login(dataUserAuthentication: any) {
        const user: any = await this.http
          .post(`${environment.apiUrl}/authentication/sign-in`, {
            username: dataUserAuthentication.username,
            password: dataUserAuthentication.password,
          })
          .toPromise();
    
        await this.saveUser(user);
        return user;
    }

    async saveUser(user: any) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    logOut() {
        localStorage.removeItem('user');
    }
}


