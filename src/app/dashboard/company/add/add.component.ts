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
  companyPage: CompanyPage;
  message = '';
  errMessage = '';

  constructor(private companyService: CompanyService) {
    this.company = new Company();
    this.getCompanyPage();
  }

  ngOnInit() {
  }

  getCompanyPage(page: number = null) {
    this.companyService.getCompanyPage(page)
      .subscribe(
        data => this.companyPage = data,
        error => this.errMessage = 'Company could not load' + error.status,
    )
  }

  onEdit($event: number) {
    Object.assign(this.company, this.companyPage.content.find(p => p.id == $event));
  }

  onDelete($event: number) {
    this.companyService.deleteCompany($event)
    .subscribe(
      data => {
        this.companyPage.content.splice(this.companyPage.content.findIndex(cus => cus.id == $event), 1);
        this.message = 'Company deleted : ' + data.statusText;
      },
      error => this.errMessage = 'Could not delete company',
    );
  }

  onCompany($event: Company) {
    if ($event.id == null || $event.id == 0) {
      this.companyService.saveCompany($event)
        .subscribe(
          data => {
            this.message = 'Company saved'
            this.companyPage.content.push(data);
          },
          error => {
            this.errMessage = 'Company saving filed';
            console.log('Company saving failed ');
          }
        );
    } else {
      this.companyService.updateCompany($event)
      .subscribe(
        data => {
          this.message = 'Company updated';
          this.companyPage.content.splice(this.companyPage.content.findIndex(p => p.id == data.id),1, data);
        },
        error => this.errMessage = 'Company could not update ' + error.status,
      );
    }
  }

  clear(){
    this.message = '';
    this.errMessage = '';
  }

}
