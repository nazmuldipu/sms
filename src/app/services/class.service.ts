import { Injectable } from '@angular/core';
import { ClassPage } from '../models/class-page.model';
import { Class } from '../models/class.model';
import { RestDataSource } from './rest.datasource';
import { Router } from '@angular/router';
import { RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ClassService {
    serviceUrl = 'api/v1/classes';

    constructor(private router: Router, private datasource: RestDataSource) {
    }

    getClassPage(companyId: number, page: number = null): Observable<ClassPage> {
        const pageUrl = page == null ? '' : 'page=' + page + '&';
        return this.datasource.sendRequest(RequestMethod.Get, this.serviceUrl + `/byCompany/${companyId}`, null, true, pageUrl);
    }
    getClassListByCompanyId(compnayId: number): Observable<Class[]> {
        return this.datasource.sendRequest(RequestMethod.Get, this.serviceUrl + `/classList/${compnayId}`, null, true, null);
    }

    saveClass(nclass: Class, companyId: number): Observable<Class> {
        const pageUrl = 'companyId=' + companyId + '&';
        if (nclass.id == null || nclass.id == 0) {
            return this.datasource.sendRequest(RequestMethod.Post, this.serviceUrl, nclass, true, pageUrl);
        }
    }

    updateClss(nclass: Class, companyId: number): Observable<Class> {
        const pageUrl = 'companyId=' + companyId + '&';
        if (nclass.id > 0) {
            return this.datasource.sendRequest(RequestMethod.Post, this.serviceUrl, nclass, true, pageUrl);
        }
    }

    deleteClass(id: number) {
        return this.datasource.sendRequest(RequestMethod.Delete, this.serviceUrl + `/${id}`, null, true, null);
    }


}
