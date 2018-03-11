import { Injectable } from "@angular/core";
import { RestDataSource } from "./rest.datasource";
import { Observable } from "rxjs/Observable";
import { RequestMethod } from "@angular/http";

@Injectable()
export class ReportService{
    serviceUrl = 'api/v1/reports';

    constructor(private datasource: RestDataSource) { 
    }

    getReport():Observable<any>{
        return this.datasource.sendRequest(RequestMethod.Get, this.serviceUrl, null, true, null);
    }
    
}