import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { RequestMethod } from '@angular/http';
import { RestDataSource } from './rest.datasource';
import { UserPage } from '../models/user-page.model';
import { User } from '../models/user.model';

@Injectable()
export class UserService {
    serviceUrl = 'api/v1/users';
    
    constructor(private router: Router, private datasource: RestDataSource) {
        this.getUserPage();
    }

    getUserPage(page: number = null):Observable<UserPage>{
        const pageUrl = page == null ? ''  :  'page=' + page + '&';
        return this.datasource.sendRequest(RequestMethod.Get, this.serviceUrl, null , true, pageUrl);
    }

    saveUser(user: User):Observable<User>{
        if (user.id == null || user.id == 0 ) 
            return this.datasource.sendRequest(RequestMethod.Post, this.serviceUrl, user, true, null);
    }

    updateUser(user: User):Observable<User>{
        if (user.id >= 0 ) 
            return this.datasource.sendRequest(RequestMethod.Put, this.serviceUrl+`/${user.id}`, user, true, null);
    }

    deleteUser(id: number):Observable<Response>{
        return this.datasource.sendRequest(RequestMethod.Delete, this.serviceUrl+`/${id}`, null, true, null);
    }
    
}
