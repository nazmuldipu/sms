import { Component, OnInit } from '@angular/core';
import { Company } from '../../../models/company.model';
import { Class } from '../../../models/class.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GeneralSMS } from '../../../models/general-sms.model';
import { ClassService } from '../../../services/class.service';
import { CompanyService } from '../../../services/company.service';
import { SMSService } from '../../../services/sms.service';

@Component({
  selector: 'app-classwise-bd',
  templateUrl: './classwise-bd.component.html',
})
export class ClasswiseBdComponent implements OnInit {
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
      message: ['', [Validators.required, Validators.maxLength(70)]]
    });
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
      this.smsService.sendClassBd(this.generalSMS)
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
