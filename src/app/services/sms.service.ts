import { Injectable } from "@angular/core";
import { GeneralSMSList } from "../models/general-sms-list.model";
import { RestDataSource } from "./rest.datasource";
import { RequestMethod } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { GeneralSMS } from "../models/general-sms.model";
import { SMSPage } from "../models/sms-page.model";

@Injectable()
export class SMSService {
    serviceUrl = 'api/v1/sms';

    constructor(private datasource: RestDataSource) { 
    }
    
    sendAllEng(generalSMS: GeneralSMS):Observable<any>{
        return this.datasource.sendRequest(RequestMethod.Post, this.serviceUrl+`/allENG`, generalSMS, true, null)
    }
    sendAllBd(generalSMS: GeneralSMS):Observable<any>{
        return this.datasource.sendRequest(RequestMethod.Post, this.serviceUrl+`/allBD`, generalSMS, true, null)
    }

    sendClassEng(generalSMS: GeneralSMS):Observable<any>{
        return this.datasource.sendRequest(RequestMethod.Post, this.serviceUrl+`/classENG/${generalSMS.number}`, generalSMS, true, null)
    }
    sendClassBd(generalSMS: GeneralSMS):Observable<any>{
        return this.datasource.sendRequest(RequestMethod.Post, this.serviceUrl+`/classBD/${generalSMS.number}`, generalSMS, true, null)
    }
    

    sendAbsentEng(generalSMSList: GeneralSMSList):Observable<any>{
        return this.datasource.sendRequest(RequestMethod.Post, this.serviceUrl+`/absentENG`, generalSMSList, true, null)
    }
    sendAbsentBd(generalSMSList: GeneralSMSList):Observable<any>{
        return this.datasource.sendRequest(RequestMethod.Post, this.serviceUrl+`/absentBD`, generalSMSList, true, null)
    }

    sendResultEng(generalSMSList: GeneralSMSList):Observable<any>{
        return this.datasource.sendRequest(RequestMethod.Post, this.serviceUrl+`/resultENG`, generalSMSList, true, null)
    }
    sendResultBd(generalSMSList: GeneralSMSList):Observable<any>{
        return this.datasource.sendRequest(RequestMethod.Post, this.serviceUrl+`/resultBD`, generalSMSList, true, null)
    }

    sendManualEng(generalSMS: GeneralSMS):Observable<any>{
        return this.datasource.sendRequest(RequestMethod.Post, this.serviceUrl+`/manualENG`, generalSMS, true, null)
    }
    sendManualBd(generalSMS: GeneralSMS):Observable<any>{
        return this.datasource.sendRequest(RequestMethod.Post, this.serviceUrl+`/manualBD`, generalSMS, true, null)
    }

    getBalance():Observable<any>{
        return this.datasource.sendRequest(RequestMethod.Get, this.serviceUrl+`/balance`, null, true, null);
    }

    getHistory(page: number = null):Observable<SMSPage>{
        const pageUrl = page == null ? ''  :  'page=' + page + '&';
        return this.datasource.sendRequest(RequestMethod.Get, this.serviceUrl+`/history`, null, true, pageUrl); 
    }
    
}