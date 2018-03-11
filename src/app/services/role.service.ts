import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { RequestMethod } from '@angular/http';
import { RestDataSource } from './rest.datasource';
import { RolesPage } from '../models/roles-page.model';
import { Role } from '../models/role.model';

@Injectable()
export class RoleService {
    serviceUrl = 'api/v1/roles';

    constructor(private router: Router, private datasource: RestDataSource) {
    }

    getRoleList(): Observable<Role[]>{
        return this.datasource.sendRequest(RequestMethod.Get, this.serviceUrl+'/list', null, true, null);
    }

    getRolesPage(page: number = null): Observable<RolesPage> {
        const pageUrl = page == null ? '' : 'page=' + page + '&';
        return this.datasource.sendRequest(RequestMethod.Get, this.serviceUrl, null, true, pageUrl);
    }

    saveRoles(role: Role): Observable<Role> {
        return this.datasource.sendRequest(RequestMethod.Post, this.serviceUrl, role, true, null);
    }

    updateRole(role: Role): Observable<Role> {
        if (role.id != 1)
            return this.datasource.sendRequest(RequestMethod.Put, this.serviceUrl + `/${role.id}`, role, true, null);
    }

    deleteRole(id: number):Observable<Response>{
        if (id != 1)
            return this.datasource.sendRequest(RequestMethod.Delete, this.serviceUrl + `/${id}`, null, true, null);
    }
}
