import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { RequestMethod } from '@angular/http';
import { RestDataSource } from './rest.datasource';
import { UserPage } from '../models/user-page.model';
import { User } from '../models/user.model';

@Injectable()
export class UserService {
    public usersPage: UserPage;
    private locator = (p: User, id: number) => p.id == id;
    serviceUrl = 'api/v1/users';
    message='';
    errMessage='';
    constructor(private router: Router, private datasource: RestDataSource) {
        this.getUserPage();
    }

    getMessage():string{
        return this.message;
    }
    getErrorMessage():string{
        return this.errMessage;
    }

    getUser( id: number ){
        return this.usersPage.content.find(p => this.locator(p, id));
    }

    getUsers(): UserPage{
        return this.usersPage;
    }

    getUserPage(page: number = null) {
        const pageUrl = page == null ? ''  :  'page=' + page + '&';
        this.datasource.sendRequest(RequestMethod.Get, this.serviceUrl, null , true, pageUrl)
            .subscribe(
                data => {
                    console.log(data);
                    this.usersPage = data;
                },
                error => {
                    this.errMessage = 'User page loading failure';
                }
            );
    }

    saveUser(user: User){
        console.log(user);
        if (user.id == 0 || user.id == null) {
            this.datasource.sendRequest(RequestMethod.Post, this.serviceUrl, user, true, null)
            .subscribe(
                data => {
                    this.message= 'User saved'
                    this.usersPage.content.push(data);
                },
                error => {
                    this.errMessage = 'User saving filed';
                    console.log('User saving failed ');
                }
            );
        } else {
            this.datasource.sendRequest(RequestMethod.Put, this.serviceUrl+`/${user.id}`, user, true, null)
            .subscribe(
                data => {
                    this.usersPage.content.splice(this.usersPage.content.findIndex(p => this.locator(p, user.id)), 1, data);
                    this.message = 'User updated';
                },
                error => {
                    this.errMessage='User update failed';
                    console.log('Operation failed ');
                }
            );
        }
    }

    deleteUser(id: number){
        this.datasource.sendRequest(RequestMethod.Delete, this.serviceUrl+`/${id}`, null, true, null)
            .subscribe(
                data => {
                    this.usersPage.content.splice(this.usersPage.content.findIndex(cus => cus.id === id), 1);
                    this.message = 'User deleted : ' + data.statusText;
                }, 
                err => {
                    console.log('User Could not delete', 'Failed');
                    this.errMessage = 'Could not delete user';
                }
            );
        
    }
    
}
