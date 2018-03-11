import { Component, OnInit } from '@angular/core';
import { Company } from '../../../models/company.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CompanyService } from '../../../services/company.service';
import { CompanyPage } from '../../../models/company-page.model';

@Component({
  selector: 'app-student-limit',
  templateUrl: './student-limit.component.html',
  styleUrls: ['./student-limit.component.css']
})
export class StudentLimitComponent implements OnInit {
  company: Company;
  companyPage: CompanyPage;
  companyForm: FormGroup;
  message = '';
  errMessage = '';

  constructor(private companyService: CompanyService) {
    this.company = new Company();
    this.getCompanyPage();
  }

  ngOnInit() {
    this.companyForm = new FormGroup({
      compnayId: new FormControl(null, Validators.required),
      studentLimit: new FormControl('', Validators.required)
    });
  }

  getCompanyPage(page: number = null) {
    this.companyService.getCompanyPage(page)
      .subscribe(
        data => this.companyPage = data,
        error => this.errMessage = 'Company could not load' + error.status,
    )
  }

  getCompanyId(id: number) {
    this.companyForm.controls.compnayId.setValue(id);
    Object.assign(this.company, this.companyPage.content.find(p => p.id == id));
  }

  changeStudentlimit() {
    const companyId = this.companyForm.controls.compnayId.value;
    const studentLimit = this.companyForm.controls.studentLimit.value;
    this.companyService.changeStudentLimit(companyId, studentLimit)
      .subscribe(
        data => {
          this.companyPage.content.splice(this.companyPage.content.findIndex(p => p.id == data.id), 1, data);
          this.message = 'Student Limit Changed';
        },
        error => this.errMessage = 'Student Limit changing FAILED',
    )
    this.clear();
  }

  clear() {
    this.company = new Company();
    this.companyForm.controls.studentLimit.setValue(null);
    this.message = '';
    this.errMessage = '';
  }

}
