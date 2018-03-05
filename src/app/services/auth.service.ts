import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { CookieService } from 'ngx-cookie';


import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { RequestMethod } from '@angular/http';
import { error } from 'util';
import { Role } from '../models/role.model';
import { User } from '../models/user.model';
import { RestDataSource } from './rest.datasource';

@Injectable()
export class AuthService {
    public user = new User();
    // roles: Role[];
    roles = [];

    constructor(private router: Router, private datasource: RestDataSource, private Cookie: CookieService) {
        if(this.isAuthenticated()){
            this.user = JSON.parse(Cookie.get('user')); 
            this.roles = JSON.parse(Cookie.get('roles'))
        }
    }

    getUsername(): string {
        return this.user.name;
    }

    getCurrentUser(): User {
        return this.user;
    }

    getRoles(): any {
        return this.roles;
    }

    isAuthenticated(): boolean {
        const access_token = this.Cookie.get('access_token');
        const refresh_token = this.Cookie.get('refresh_token');
        if (!access_token && !!refresh_token) {
            this.datasource.obtainAccessTokenByRefreshToken();
        }
        return !!access_token;
    }

    hasADMINRole(): boolean {
        return this.roles.includes('ADMIN');
    }

    hasRole(role: string): boolean{
        return this.roles.includes(role);
    }

    authenticate(user: User) {
        this.datasource.obtainAccessToken(user.email, user.password)
            .map( res => res.json())
            .subscribe(
                data => {
                    // Save username and roles
                    console.log(data);
                    this.user.name = data.username;
                    this.user.id = data.userId;
                    this.user.email = data.email;
                    this.roles = [];
                    for(let i = 0; i < data.roles.length; i++){
                        this.roles.push(data.roles[i].authority);
                    }
                    this.saveToken(data, '');
                },
                err => this.loginErrorHandler(err),
            );
    }

    saveToken(token, url) {
        const exDate = new Date();
        exDate.setTime( exDate.getTime() + token.expires_in * 1000 );
        this.Cookie.put('access_token', token.access_token, {expires: exDate});
        exDate.setTime( exDate.getTime() + 24 * 60 * 60 * 10000); // set refresh token for one day
        this.Cookie.put('refresh_token', token.refresh_token, {expires: exDate});
        this.Cookie.putObject('user', this.user, {expires: exDate});
        this.Cookie.putObject('roles', this.roles, {expires: exDate});
        this.router.navigateByUrl('/dashboard/index');
        // this.getCurrentUser();
    }

    getUser(): Observable<User> {
        const savedUser = this.Cookie.getObject('user');
        if (savedUser != null) {
            this.user = savedUser;
        }
        return Observable.of(this.user);
        // return this.dataSource.sendRequest(RequestMethod.Get, 'admin/user/getUser/' + id, null , true, null);
    }

    clear() {
        this.Cookie.removeAll();
        this.user = new User();
        this.roles = [];
        localStorage.clear();
        this.router.navigateByUrl('/home');
        console.log('All token cleared and logged out ');
    }

    loginErrorHandler(err) {
        console.log('Error code ' + err.status);
        this.router.navigateByUrl('/login/UserName or password error');
    }
    
}
