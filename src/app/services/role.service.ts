import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { RequestMethod } from '@angular/http';
import { RestDataSource } from './rest.datasource';
import { RolesPage } from '../models/roles-page.model';
import { Role } from '../models/role.model';

@Injectable()
export class RoleService {
    public rolesPage: RolesPage;
    private locator = (p: Role, id: number) => p.id == id;
    serviceUrl = 'api/v1/roles';
    message='';
    errMessage='';
    constructor(private router: Router, private datasource: RestDataSource) {
        this.getRolesPage();
    }

    getMessage():string{
        return this.message;
    }
    getErrorMessage():string{
        return this.errMessage;
    }

    getRole( id: number ){
        return this.rolesPage.content.find(p => this.locator(p, id));
    }

    getRoles(): RolesPage{
        return this.rolesPage;
    }

    getRolesPage(page: number = null) {
        const pageUrl = page == null ? ''  :  'page=' + page + '&';
        this.datasource.sendRequest(RequestMethod.Get, this.serviceUrl, null , true, pageUrl)
            .subscribe(
                data => {
                    this.rolesPage = data;
                },
                error => {
                    this.errMessage = 'Role pageing loading failure';
                }
            );
    }

    saveRoles(role: Role){
        if (role.id == 0 || role.id == null) {
            this.datasource.sendRequest(RequestMethod.Post, this.serviceUrl, role, true, null)
            .subscribe(
                data => {
                    this.message= 'Role saved'
                    this.rolesPage.content.push(data);
                },
                error => {
                    this.errMessage = 'Role saving filed';
                    console.log('Role saving failed ');
                }
            );
        } else if (role.id == 1){
            this.errMessage = 'Aleart!! Sorry ADMIN role can not chage';
        }else {
            this.datasource.sendRequest(RequestMethod.Put, this.serviceUrl+`/${role.id}`, role, true, null)
            .subscribe(
                data => {
                    this.rolesPage.content.splice(this.rolesPage.content.findIndex(p => this.locator(p, role.id)), 1, role);
                    this.message = 'Role updated';
                },
                error => {
                    this.errMessage='Role update failed';
                    console.log('Operation failed ');
                }
            );
        }
    }

    deleteRole(id: number){
        if(id == 1){
            this.errMessage = 'Aleart!! Sorry ADMIN role delete permission denided'
        } else {
            this.datasource.sendRequest(RequestMethod.Delete, this.serviceUrl+`/${id}`, null, true, null)
                .subscribe(
                    data => {
                        this.rolesPage.content.splice(this.rolesPage.content.findIndex(cus => cus.id === id), 1);
                        this.message = 'Role deleted : ' + data.statusText;
                    }, 
                    err => {
                        console.log('Could not delete', 'Failed');
                        this.errMessage = 'Could not delete role';
                    }
                );
        }
    }
    
}
