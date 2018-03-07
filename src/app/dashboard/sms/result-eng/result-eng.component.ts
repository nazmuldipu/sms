import { Component, OnInit } from '@angular/core';
import { Company } from '../../../models/company.model';
import { Class } from '../../../models/class.model';
import { Student } from '../../../models/student.model';
import { SMSService } from '../../../services/sms.service';
import { CompanyService } from '../../../services/company.service';
import { ClassService } from '../../../services/class.service';
import { StudentService } from '../../../services/student.service';
import { GeneralSMSList } from '../../../models/general-sms-list.model';
import { GeneralSMS } from '../../../models/general-sms.model';

@Component({
  selector: 'app-result-eng',
  templateUrl: './result-eng.component.html',
  styleUrls: ['./result-eng.component.css']
})
export class ResultEngComponent implements OnInit {
  arr = Array;
  companyId: number;
  classId: number;
  companyList: Company[] = [];
  classList: Class[] = [];
  studentList: Student[] = [];
  generalSMSList: GeneralSMSList;
  showList: Student[] = [];
  message = '';
  errorMessage = '';

  constructor(
    private smsService: SMSService,
    private companyService: CompanyService,
    private classService: ClassService,
    private studentService: StudentService,
  ) {
    this.generalSMSList = new GeneralSMSList();
    this.generalSMSList.generalSMSs = [];
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
            this.studentList = data;
            this.studentList.forEach(student => {
              const generalSMS = new GeneralSMS('-1', student.id);
              this.generalSMSList.generalSMSs.push(generalSMS);
            })
          },
          error => console.log('Student loading error')
        )
    }
  }
  // Remove non ascii key from name
  nameKeyup(value: string) {
    if (value != null) {
      this.generalSMSList.message = value.replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
    }
  }

  classChanged(classId: number) {
    this.classId = classId;
    localStorage.setItem('classId', classId + '')
    this.getStudentList(classId);
    this.message = '';
  }

  resultChanged(id, $event) {
    let student = this.studentList.find(std => std.id == id);
    // remove if already exists
    const marks = $event.target.value;
    var index = this.showList.findIndex(std => std.id == id);

    if (index !== -1) this.showList.splice(index, 1);
    if (marks > 0) {
      student.phone = $event.target.value;//using phone field to show result
      this.showList.push(student);
    } else if (marks == 0) {
      student.phone = 'Absent';
      this.showList.push(student);
    }
  }

  send(resultForm) {
    //TODO: filter results with -1 values
    if (this.generalSMSList.message.length > 0 && this.generalSMSList.number > 0) {
      this.smsService.sendResultEng(this.generalSMSList)
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
  }

  clear() {
    this.message = '';
    this.errorMessage = '';
  }
}
