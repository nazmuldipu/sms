import { Component, OnInit } from '@angular/core';
import { Company } from '../../../models/company.model';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompanyService } from '../../../services/company.service';
import { CompanyPage } from '../../../models/company-page.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  company: Company;
  
  constructor( private companyService: CompanyService ) { 
    this.company = new Company();
    this.companyService.getCompanyPage();
  }

  ngOnInit() {
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
    console.log('Page',page);
    this.companyService.getCompanyPage(page);
  }

  onEdit($event: number){
    this.company = this.companyService.getCompany($event);
  }
  onDelete($event: number){
    this.companyService.deleteCompany($event);
  }
  onCompany($event: Company){
    this.companyService.saveCompany($event);
  }

}
