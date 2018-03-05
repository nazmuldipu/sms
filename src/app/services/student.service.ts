import { Injectable } from '@angular/core';
import { RestDataSource } from './rest.datasource';
import { Router } from '@angular/router';
import { RequestMethod } from '@angular/http';
import { StudentPage } from '../models/student-page.model';
import { Student } from '../models/student.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class StudentService {
    serviceUrl = 'api/v1/students';
    
    constructor(private router: Router, private datasource: RestDataSource) { 
    }

    getStudentPage(classId: number, page: number = null): Observable<StudentPage> {
        const pageUrl = page == null ? ''  :  'page=' + page + '&';
        return this.datasource.sendRequest(RequestMethod.Get, this.serviceUrl+`/byClass/${classId}`, null , true, pageUrl);
    }

    getStudentList(classId: number):Observable<Student[]>{
        return this.datasource.sendRequest(RequestMethod.Get, this.serviceUrl+`/list/${classId}`, null , true, null);
    }

    getStudent(studentId:number):Observable<Student>{
        return this.datasource.sendRequest(RequestMethod.Get, this.serviceUrl+`/${studentId}`, null, true, null);
    }

    saveStudent(classId: number, student: Student):Observable<Student>{
        const pageUrl = 'classId=' + classId + '&';
        return this.datasource.sendRequest(RequestMethod.Post, this.serviceUrl, student, true, pageUrl);
    }

    updateStudent(classId: number, student: Student):Observable<Student>{
        const pageUrl = 'classId=' + classId + '&';
        return this.datasource.sendRequest(RequestMethod.Put, this.serviceUrl+`/${student.id}`, student, true, pageUrl);
    }
    
    deleteStudent(id: number):Observable<any>{
        return this.datasource.sendRequest(RequestMethod.Delete, this.serviceUrl+`/${id}`, null, true, null);
    }
    

}
