import { Injectable } from '@angular/core';
import { ClassPage } from '../models/class-page.model';
import { Class } from '../models/class.model';
import { RestDataSource } from './rest.datasource';
import { Router } from '@angular/router';
import { RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ClassService {
  public classPage: ClassPage;
  private locator = (p: Class, id: number) => p.id == id;
  serviceUrl = 'api/v1/classes';
  message='';
  errMessage='';
  
  constructor(private router: Router, private datasource: RestDataSource) { 
    // this.getClassPage();
  }

  getMessage():string{
    return this.message;
  }
  getErrorMessage():string{
      return this.errMessage;
  }

  getClass( id: number ){
      return this.classPage.content.find(p => this.locator(p, id));
  }

  getClasses(): ClassPage{
      return this.classPage;
  }

    getClassPage(companyId: number, page: number = null) {
        const pageUrl = page == null ? ''  :  'page=' + page + '&';
        this.datasource.sendRequest(RequestMethod.Get, this.serviceUrl+`/byCompany/${companyId}`, null , true, pageUrl)
        .subscribe(
            data => {
                this.classPage = data;
            },
            error => {
                this.errMessage = 'Class page loading failure';
            }
        );
    }
    getClassListByCompanyId(compnayId: number):Observable<Class[]>{
        return this.datasource.sendRequest(RequestMethod.Get, this.serviceUrl+`/classList/${compnayId}`, null, true, null);
    }
    saveClass(nclass: Class, companyId: number){
        const pageUrl = 'companyId=' + companyId + '&';
        if (nclass.id == 0 || nclass.id == null) {
            this.datasource.sendRequest(RequestMethod.Post, this.serviceUrl, nclass, true, pageUrl)
            .subscribe(
                data => {
                    this.message= 'Class saved'
                    this.classPage.content.push(data);
                },
                error => {
                    this.errMessage = 'Class saving filed';
                    console.log('Class saving failed ');
                }
            );
        } else {
            this.datasource.sendRequest(RequestMethod.Put, this.serviceUrl+`/${nclass.id}`, nclass, true, pageUrl)
            .subscribe(
                data => {
                    this.classPage.content.splice(this.classPage.content.findIndex(p => this.locator(p, nclass.id)), 1, data);
                    this.message = 'Class updated';
                },
                error => {
                    this.errMessage='Class update failed';
                    console.log('Class update failed');
                }
            );
        }
    }

  deleteClass(id: number){
      this.datasource.sendRequest(RequestMethod.Delete, this.serviceUrl+`/${id}`, null, true, null)
          .subscribe(
              data => {
                  this.classPage.content.splice(this.classPage.content.findIndex(cus => cus.id === id), 1);
                  this.message = 'Class deleted : ' + data.statusText;
              }, 
              err => {
                  console.log('Class Could not delete', 'Failed');
                  console.log(err)
                  this.errMessage = 'Delete Failed!! ' + err._body;
              }
          );
      
  }

  clear(){
      this.message = '';
      this.errMessage = '';
  }

}
