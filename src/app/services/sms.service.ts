import { Injectable } from "@angular/core";
import { GeneralSMSList } from "../models/general-sms-list.model";
import { RestDataSource } from "./rest.datasource";
import { RequestMethod } from "@angular/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class SMSService {
    serviceUrl = 'api/v1/sms';

    constructor(private datasource: RestDataSource) { 
    }
    
    sendAbsentEng(generalSMSList: GeneralSMSList):Observable<any>{
        return this.datasource.sendRequest(RequestMethod.Post, this.serviceUrl+`/absentENG`, generalSMSList, true, null)
    }
    sendAbsentBd(generalSMSList: GeneralSMSList):Observable<any>{
        return this.datasource.sendRequest(RequestMethod.Post, this.serviceUrl+`/absentBD`, generalSMSList, true, null)
    }
    
}