import { Component, Input, Output, EventEmitter} from '@angular/core';
import { CompanyPage } from '../../../models/company-page.model';
import { Company } from '../../../models/company.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
})
export class AddCompanyComponent{

    companyForm: FormGroup;
    @Input() company: Company;
    @Output() onCompany:EventEmitter<Company> = new EventEmitter<Company>();
  
    constructor(private builder: FormBuilder) { 
        this.createForm();
    }

    createForm() {
        this.companyForm = this.builder.group({
          companyName: ['', Validators.required ],
          companyNameBangla: ['', [Validators.required]],
          companyAddress: ['', [Validators.required]],
          contactPerson: ['', Validators.required],
          telephone: ['', [Validators.required, Validators.pattern('^01[0-9][ ]?[0-9]{2}[ ]?[0-9]{3}[ ]?[0-9]{3}$')]],
          webAddress: '',
          country: '',
          maximumNumberOfStudent: [0, [Validators.required]],
          smsQuota: [0, [Validators.required]],
          perMonthValue: [0, [Validators.required]],
        });
    }

    saveCompany(){
        this.company.telephone = this.company.telephone.replace(/\s/g, '');
        this.onCompany.emit(this.company);
        this.company = new Company();
        this.createForm();
    }
    clear(){
        this.company = new Company();
        this.createForm();
    }
}
