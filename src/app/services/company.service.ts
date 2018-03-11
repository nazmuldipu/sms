import { Injectable } from "@angular/core";
import { CompanyPage } from "../models/company-page.model";
import { Company } from "../models/company.model";
import { Router } from "@angular/router";
import { RestDataSource } from "./rest.datasource";
import { RequestMethod } from "@angular/http";
import { Observable } from "rxjs/Observable";


@Injectable()
export class CompanyService{
    serviceUrl = 'api/v1/companies';
    
    constructor(private router: Router, private datasource: RestDataSource) {
    }

    getCompanyPage(page: number = null):Observable<CompanyPage> {
        const pageUrl = page == null ? ''  :  'page=' + page + '&';
        return this.datasource.sendRequest(RequestMethod.Get, this.serviceUrl, null , true, pageUrl);
    }

    getCompanyList():Observable<Company[]>{
        return this.datasource.sendRequest(RequestMethod.Get, this.serviceUrl+'/companyList', null, true, null);
    }

    saveCompany(company: Company):Observable<Company>{
        if (company.id == null || company.id == 0 ) 
            return this.datasource.sendRequest(RequestMethod.Post, this.serviceUrl, company, true, null);
    }
    
    updateCompany(company: Company):Observable<Company>{
        if (company.id >= 0 ) 
            return this.datasource.sendRequest(RequestMethod.Put, this.serviceUrl+`/${company.id}`, company, true, null)
    }
    
    changeStudentLimit(companyId: number, studentNumber: number):Observable<Company>{
        const param = 'studentNumber='+studentNumber+'&';
        return this.datasource.sendRequest(RequestMethod.Patch, this.serviceUrl+`/${companyId}/changeStudentLimit`, null, true, param);
    }

    buySMS(companyId: number, smsQuota: number):Observable<Company>{
        const param = 'studentNumber='+smsQuota+'&';
        return this.datasource.sendRequest(RequestMethod.Patch, this.serviceUrl+`/${companyId}/buySms`, null, true, param);
    }

    deleteCompany(id: number):Observable<any>{
        return this.datasource.sendRequest(RequestMethod.Delete, this.serviceUrl+`/${id}`, null, true, null);
    }
}