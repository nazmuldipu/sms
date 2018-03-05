import { Injectable } from "@angular/core";
import { CompanyPage } from "../models/company-page.model";
import { Company } from "../models/company.model";
import { Router } from "@angular/router";
import { RestDataSource } from "./rest.datasource";
import { RequestMethod } from "@angular/http";
import { Observable } from "rxjs/Observable";


@Injectable()
export class CompanyService{
    public companyPage: CompanyPage;
    private locator = (p: Company, id: number) => p.id == id;
    serviceUrl = 'api/v1/companies';
    message='';
    errMessage='';
    constructor(private router: Router, private datasource: RestDataSource) {
        // this.getCompanyPage();
    }

    getMessage():string{
        return this.message;
    }
    getErrorMessage():string{
        return this.errMessage;
    }

    getCompany( id: number ){
        return this.companyPage.content.find(p => this.locator(p, id));
    }

    getCompanies(): CompanyPage{
        return this.companyPage;
    }

    getCompanyPage(page: number = null) {
        const pageUrl = page == null ? ''  :  'page=' + page + '&';
        this.datasource.sendRequest(RequestMethod.Get, this.serviceUrl, null , true, pageUrl)
            .subscribe(
                data => {
                    this.companyPage = data;
                },
                error => {
                    this.errMessage = 'Company page loading failure';
                }
            );
    }

    getCompanyList():Observable<Company[]>{
        return this.datasource.sendRequest(RequestMethod.Get, this.serviceUrl+'/companyList', null, true, null);
    }

    saveCompany(company: Company){
        if (company.id == 0 || company.id == null) {
            this.datasource.sendRequest(RequestMethod.Post, this.serviceUrl, company, true, null)
            .subscribe(
                data => {
                    this.message= 'Company saved'
                    this.companyPage.content.push(data);
                },
                error => {
                    this.errMessage = 'Company saving filed';
                    console.log('Company saving failed ');
                }
            );
        } else {
            this.datasource.sendRequest(RequestMethod.Put, this.serviceUrl+`/${company.id}`, company, true, null)
            .subscribe(
                data => {
                    this.companyPage.content.splice(this.companyPage.content.findIndex(p => this.locator(p, company.id)), 1, company);
                    this.message = 'Company updated';
                },
                error => {
                    this.errMessage='Company update failed';
                    console.log('Company update failed');
                }
            );
        }
    }

    changeStudentLimit(companyId: number, studentNumber: number){
        const param = 'studentNumber='+studentNumber+'&';
        this.datasource.sendRequest(RequestMethod.Patch, this.serviceUrl+`/${companyId}/changeStudentLimit`, null, true, param)
        .subscribe(
            data =>{
                this.companyPage.content.splice(this.companyPage.content.findIndex(p => this.locator(p, companyId)), 1, data);
                this.message = 'Student Limit Changed';
            },
            error=>{
                this.errMessage = 'Student Limit changing FAILED',
                console.log(error.status);
            }
        )
    }

    buySMS(companyId: number, smsQuota: number){
        const param = 'studentNumber='+smsQuota+'&';
        this.datasource.sendRequest(RequestMethod.Patch, this.serviceUrl+`/${companyId}/buySms`, null, true, param)
        .subscribe(
            data =>{
                this.companyPage.content.splice(this.companyPage.content.findIndex(p => this.locator(p, companyId)), 1, data);
                this.message = 'SMS bought successfully';
            },
            error=>{
                this.errMessage = 'SMS Buying FAILED',
                console.log(error.status);
            }
        )
    }

    deleteCompany(id: number){
        this.datasource.sendRequest(RequestMethod.Delete, this.serviceUrl+`/${id}`, null, true, null)
            .subscribe(
                data => {
                    this.companyPage.content.splice(this.companyPage.content.findIndex(cus => cus.id === id), 1);
                    this.message = 'Company deleted : ' + data.statusText;
                }, 
                err => {
                    console.log('Company Could not delete', 'Failed');
                    this.errMessage = 'Could not delete company';
                }
            );
        
    }
}