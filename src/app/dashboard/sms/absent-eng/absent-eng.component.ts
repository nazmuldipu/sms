import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../../services/company.service';
import { ClassService } from '../../../services/class.service';
import { StudentService } from '../../../services/student.service';
import { Company } from '../../../models/company.model';
import { Class } from '../../../models/class.model';
import { Student } from '../../../models/student.model';
import { GeneralSMS } from '../../../models/general-sms.model';
import { GeneralSMSList } from '../../../models/general-sms-list.model';
import { SMSService } from '../../../services/sms.service';

@Component({
  selector: 'app-absent-eng',
  templateUrl: './absent-eng.component.html',
  styleUrls: ['./absent-eng.component.css']
})

/* 
  1) Get Student List first
*/
export class AbsentEngComponent implements OnInit {
  arr = Array;
  companyId: number;
  classId: number;
  companyList: Company[] = [];
  classList: Class[] = [];
  studentList: Student[] = [];
  absentStudentList: Student[];
  message = '';
  errorMessage = '';

  constructor(
    private smsService: SMSService,
    private companyService: CompanyService,
    private classService: ClassService,
    private studentService: StudentService,
  ) {
    this.absentStudentList = [];
    //retreive values from localstorage
    this.companyId = +localStorage.getItem('companyId');
    this.classId = +localStorage.getItem('classId');

  }

  ngOnInit() {
    //Company List
    if (this.companyId == null || this.companyId < 1) {
      this.getCompanyList();
    } else {
      this.getClassList(this.companyId);
    }
    // get student list if classid set on localstorage
    if (this.classId != null && this.classId > 0) {
      this.getStudentList(this.classId);
    }
  }

  getCompanyList() {
    this.companyService.getCompanyList()
      .subscribe(
        data => {
          this.companyList = data;
          if (this.companyList.length == 1) {
            // save company info for non admin
            this.companyId = data[0].id;
            localStorage.setItem('companyId', this.companyId + '');
            if (this.classId == null || this.classId < 1)
              this.getClassList(this.companyId);
          }
        },
        error => console.log('Company list loading error: ' + error.status)
      )
  }

  getClassList(companyId: number) {
    this.classService.getClassListByCompanyId(companyId)
      .subscribe(
        data => {
          this.classList = data;
        },
        error => {
          console.log('Class loading error', error.status);
        }
      )
  }

  getStudentList(classId: number) {
    if (classId > 0) {
      this.studentService.getStudentList(classId)
        .subscribe(
          data => {
            this.absentStudentList = [];
            this.studentList = data;
          },
          error => console.log('Student loading error')
        )
    }
  }

  classChanged(classId: number) {
    this.classId = classId;
    localStorage.setItem('classId', classId + '')
    this.getStudentList(classId);
    this.message = '';
  }

  studentSelected(id,$event){
    if($event.target.checked){
      this.absentStudentList.push(this.studentList.find(std => std.id == id));
    }
    else{
      this.absentStudentList.splice(this.absentStudentList.findIndex(std => std.id == id), 1);
    }
  }

  send(){
    let generalSMSList:GeneralSMSList = new GeneralSMSList();
    generalSMSList.generalSMSs = [];
    this.absentStudentList.forEach(student=>{
      let gsms = new GeneralSMS('on',student.id);
      generalSMSList.generalSMSs.push(gsms);
    })
    console.log(generalSMSList);
    this.smsService.sendAbsentEng(generalSMSList)
    .subscribe(
      data => {
        this.message = '';
        data.forEach(resp => {
          this.message += resp.number + ': ' + resp.result + ';  ';
        });
        
      },
      error => this.errorMessage = error,
    )
  }

  clear() {
    this.message = '';
    this.errorMessage = '';
  }
}
