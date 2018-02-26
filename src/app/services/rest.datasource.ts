import { Injectable } from '@angular/core';
import { Http, Request, RequestMethod, RequestOptions, Headers } from '@angular/http';

// import { CookieService } from 'ngx-cookie-service';
// import {CookieService} from 'angular2-cookie/core';
import { CookieService } from 'ngx-cookie';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';


const PROTOCOL = 'http';
const PORT = 8000;
const SERVER = 'localhost';
// const SERVER = '192.168.31.6';
// const SERVER = '172.104.166.238';
// const SERVER = '192.168.0.104';
// const SERVER = '172.104.173.180';
@Injectable()
export class RestDataSource {
    urlFlag = true;
    baseUrl: string;
    auth_token: string;

    constructor(
        private router: Router, private http: Http, private Cookie: CookieService) {
        this.baseUrl = `${PROTOCOL}://${SERVER}:${PORT}/`;
    }

    getAuthtoken(): string {
        return this.auth_token;
    }

    obtainAccessToken(user: string, pass: string): Observable<any> {
        const params = new URLSearchParams();
        params.append('grant_type', 'password');
        params.append('username', user);
        params.append('password', pass);

        const headers = new Headers({'Content-type': 'application/x-www-form-urlencoded;',
                                'Authorization': 'Basic ' + btoa('my-trusted-client:secret')});
        const options = new RequestOptions({ headers: headers });

        const url = this.baseUrl + 'oauth/token';
        return this.http.post( url, params.toString(), options)
        .map(res => {
            return res;
        });
    }

    obtainAccessTokenByRefreshToken() {
        if (this.urlFlag == true) {
            this.urlFlag = false;
            const params = new URLSearchParams();
            params.append('grant_type', 'refresh_token');
            params.append('refresh_token', this.Cookie.get('refresh_token'));

            const headers = new Headers({'Content-type': 'application/x-www-form-urlencoded;',
                                    'Authorization': 'Basic ' + btoa('my-trusted-client:secret')});

            const options = new RequestOptions({ headers: headers });
            const url = this.baseUrl + 'oauth/token';
            return this.http.post( url, params.toString(), options)
                .subscribe(
                    data => {
                        this.saveToken(data);
                    },
                    err => this.loginErrorHandler(err),
                );
        }
      }

    saveToken(token) {
        const newToken = JSON.parse(token._body);
        const exDate = new Date();
        exDate.setTime( exDate.getTime() + newToken.expires_in * 1000 );
        this.Cookie.put('access_token', newToken.access_token, {expires: exDate});
        this.urlFlag = true;
        // exDate.setTime( exDate.getTime() + 24 * 60 * 60 * 10000); // set refresh token for one day
        // this.Cookie.put('refresh_token', token._body.refresh_token, {expires: exDate});
        return;
    }

    authenticate(user: string, pass: string): Observable<boolean> {
        return this.http.request(new Request({
            method: RequestMethod.Post,
            url: this.baseUrl + 'login',
            body: { name: user, password: pass }
        })).map(response => {
                const res = response.json();
                this.auth_token = res.success ? res.token : null;
                if (res.success) {
                    localStorage.setItem('access_token', JSON.stringify(res.token));
                }
                return res.success;
            });
    }


    public sendRequest(method: RequestMethod, url: string, body?, auth: boolean = false, par?): Observable<any> {
        const params = new URLSearchParams();
        par = par == null ? '' : par;

        const acc = this.Cookie.get('access_token');
        const ref = this.Cookie.get('refresh_token');

        // if no authentication required
        if (!auth) {
            const request = new Request({
                method: method,
                url: this.baseUrl + url ,
                body: body,
            });
            console.log( 'Condition 1 : ');
            console.log(request);
            return this.http.request(request).map(response => response.json());

            // if authentication required and access_token present
        } else if (auth && !!acc) {
            params.append('access_token', this.Cookie.get('access_token'));
            const request = new Request( {
                method: method,
                url: this.baseUrl + url + '?' + par + params.toString(),
                body: body,
            });
            console.log( 'Condition 2 : ');
            console.log(request);
            return this.http.request(request)
                .map(response => {
                    if (response['_body'] == '') {
                        return response;
                    }
                    return response.json();
                });

            // if (auth requred and no access_token present and refresh token present) then obtain access_token using refresh token
        } else if (auth && !acc  && !!ref ) {
            this.obtainAccessTokenByRefreshToken();
            if (!this.Cookie.get('access_token')) {
                const start = new Date().getTime();
                while (new Date().getTime() < start + 3000) {}
            }
            params.append('access_token', this.Cookie.get('access_token'));
            const request = new Request( {
                method: method,
                url: this.baseUrl + url + '?' + par + params.toString(),
                body: body,
            });
            console.log( 'Condition 3 : ');
            console.log(request);
            return this.http.request(request).map(response => response.json());
        } else {
            // if no refresh token present
            return null;
        }

    }

    loginErrorHandler(err) {
        console.log('Error code ' + err.status);
        this.Cookie.removeAll();
        this.router.navigateByUrl('/login/UserName or password error');
    }

    
}
