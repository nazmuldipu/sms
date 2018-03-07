import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../../services/company.service';
import { ClassService } from '../../../services/class.service';
import { Company } from '../../../models/company.model';
import { Class } from '../../../models/class.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GeneralSMS } from '../../../models/general-sms.model';
import { SMSService } from '../../../services/sms.service';

@Component({
  selector: 'app-classwise-eng',
  templateUrl: './classwise-eng.component.html',
})
export class ClasswiseEngComponent implements OnInit {
  companyId: number;
  companyList: Company[] = [];
  classList: Class[] = [];
  classStudentForm: FormGroup;
  generalSMS: GeneralSMS;
  message = '';
  errorMessage = '';

  constructor(
    private builder: FormBuilder,
    private classService: ClassService,
    private companyService: CompanyService,
    private smsService: SMSService
  ) {
    this.generalSMS = new GeneralSMS();
    this.companyId = +localStorage.getItem('companyId');
    this.generalSMS.number = +localStorage.getItem('classId');
    this.createForm();
  }

  ngOnInit() {
    //Company List
    if (this.companyId == null || this.companyId < 1) {
      this.getCompanyList();
    } else {
      this.getClassList(this.companyId);
    }
  }

  createForm() {
    this.classStudentForm = this.builder.group({
      classId: ['', Validators.required],
      message: ['', [Validators.required, Validators.maxLength(160)]]
    });
  }

  // Remove non ascii key from name
  nameKeyup(value: string) {
    if (value != null) {
      this.generalSMS.message = value.replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
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

  classChanged(classId: number) {
    this.generalSMS.number = classId;
    localStorage.setItem('classId', classId + '')
  }

  send() {
    if (this.classStudentForm.valid) {
      this.smsService.sendClassEng(this.generalSMS)
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
