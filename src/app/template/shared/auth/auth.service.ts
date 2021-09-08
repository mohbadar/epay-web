import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Principal } from 'app/_models/principal';

export interface UserDetails {
    id: number;
    name: string;
    username: string;
    exp: number;
}

@Injectable()
export class AuthService {
    private user: Observable<firebase.User>;
    private userDetails: firebase.User = null;
    username;
    token;
    userName;
    principal: Principal = new Principal(false, [], [], [], null, null, '', '', '', '', '', '', null, true, []);

    constructor(public _firebaseAuth: AngularFireAuth, public router: Router,
        private http: HttpClient,) {
        this.user = _firebaseAuth.authState;
        this.user.subscribe((user) => {
            if (user) {
                this.userDetails = user;
            }
            else {
                this.userDetails = null;
            }
        });

    }

    //   signupUser(email: string, password: string) {
    //     //your code for signing up the new user
    //   }

    //   signinUser(email: string, password: string) {
    //     //your code for checking credentials and getting tokens for for signing in user
    //     // return this._firebaseAuth.signInWithEmailAndPassword(email, password)

    //     //uncomment above firebase auth code and remove this temp code
    //     return new Promise(function(resolve, reject) {
    //       setTimeout(function() {
    //         resolve(true);
    //       }, 1000);
    //     });

    //   }

    //   logout() {
    //     this._firebaseAuth.signOut();
    //     this.router.navigate(['YOUR_LOGOUT_URL']);
    //   }

    //   isAuthenticated() {
    //     return true;
    //   }



    signinUser(username: string, password: string, lang: string = 'ps'): Observable<any> {
        return this.login({
            'username': username,
            'password': password,
            'lang': lang
        })
    }

    public saveToken(token: string) {
        localStorage.setItem('auth_token', token);
        this.token = token;
    }

    public getToken(): string {
        if (!this.token) {
            this.token = localStorage.getItem('auth_token');
        }
        return this.token;
    }

    public getUserDetails(): UserDetails {
        const token = this.getToken();
        let payload;
        if (token && token != "undefined") {
            payload = token.split('.')[1];
            payload = window.atob(payload);
            return JSON.parse(payload);
            // var dt = new Date();
            // dt.setHours( dt.getHours() + 2 );
            // payload = {
            // 	exp: dt
            // }
            // return payload;
        } else {
            return null;
        }
    }

    public isLoggedIn(): boolean {
        const user = this.getUserDetails();
        if (user) {
            return user.exp > Date.now() / 1000;
        } else {
            return false;
        }
    }

    public checkUserLogin() {
        if (this.isLoggedIn()) {
            return true;
        } else {
            this.routeToLandingPage();
        }
    }

    routeToHomePage(clearAuthToken?: boolean) {
        if (clearAuthToken) {
            this.token = null;
            localStorage.removeItem('auth_token');
        }
        this.router.navigateByUrl('/');
    }

    routeToServiceSeletionPage(clearAuthToken?: boolean) {
        this.router.navigateByUrl('/service-selection');
    }

    routeToLangSeletionPage(clearAuthToken?: boolean) {
        this.router.navigateByUrl('/select-lang');
    }

    routeToLandingPage() {
        // TODO: this path have to be taken from login user profile.
        this.router.navigateByUrl('/');
    }

    routeToLoginPage(clearAuthToken?: boolean) {
        if (clearAuthToken) {
            this.token = null;
            localStorage.removeItem('auth_token');
        }
        // this.router.navigateByUrl('/login');
        window.location.href = '/login';
    }

    removeToken() {
        this.token = '';
        window.localStorage.removeItem('aut_token');
    }

    reloadCurrentPage() {
        window.location.reload();
    }

    routeToCustomPage(page: string) {
        this.router.navigateByUrl(page);
    }

    login(data: any): Observable<any> {
        this.token = null;
        localStorage.removeItem('auth_token');
        return this.http.post('/api/login', data);
        // return this.http.post('/api/auth/login/', data);
    }

    public logout(): Observable<any> {
        this.token = null;
        localStorage.removeItem('auth_token');
        return this.http.post('/api/logout', '');
    }

    getConfig(): Observable<any> {
        return this.http.get(`/api/config`);
    }

    getProfile(): Observable<Object> {
        return this.http.get(`/api/profile`);
    }

    updateAvatar(obj: Object): Observable<any> {
        return this.http.patch(`/api/avatar`, obj);
    }

    updateConfig(obj: Object): Observable<any> {
        return this.http.put(`/api/config`, obj);
    }

    getProfilePicture(): Observable<any> {
        return this.http.get(`/api/user/profile-picture`);
    }

}
