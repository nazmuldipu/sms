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
  companyForm: FormGroup;
  
  constructor(private companyService: CompanyService) {
    this.company = new Company();
    this.companyService.getCompanyPage();
   }

  ngOnInit() {
    this.companyForm = new FormGroup({
      compnayId: new FormControl(null, Validators.required),
      studentLimit: new FormControl('', Validators.required)
    });
  }

  get message(): string{
    return this.companyService.getMessage();
  }
  get errMessage(): string{
    return this.companyService.getErrorMessage();
  }

  get companyPage():CompanyPage{
    return this.companyService.getCompanies();
  }

  getCompanyPage(page: number = null){
    this.companyService.getCompanyPage(page);
  }

  getCompanyId(id:number){
    this.companyForm.controls.compnayId.setValue(id);
    this.company = this.companyService.getCompany(id);
  }

  changeStudentlimit(){
    const companyId = this.companyForm.controls.compnayId.value;
    const studentLimit = this.companyForm.controls.studentLimit.value;
    this.companyService.changeStudentLimit(companyId, studentLimit);
  }

}
