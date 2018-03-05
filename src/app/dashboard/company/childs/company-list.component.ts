import { Component, Input, Output, EventEmitter} from '@angular/core';
import { CompanyPage } from '../../../models/company-page.model';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
})
export class CompanyListComponent{
  arr = Array;
  @Input() companyPage: CompanyPage;
  @Input() listFor: number;// 1=add, 2 = changeStudentLimit, 3 = buy SMS
  @Output() onEdit:EventEmitter<number> = new EventEmitter<number>();
  @Output() onDelete:EventEmitter<number> = new EventEmitter<number>();
  @Output() onPage:EventEmitter<number> = new EventEmitter<number>();
  @Output() onCompanyId:EventEmitter<number> = new EventEmitter<number>();

  constructor() { 
  }

  editCompany(id: number){
    this.onEdit.emit(id);
  }
  
  deleteCompany(id: number){
    if (confirm('Are you sure to delete')) {        
      this.onDelete.emit(id);
    }
  }

  getCompanyId(id: number){
    this.onCompanyId.emit(id);
  }

  getCompanyPage(page: number){
    this.onPage.emit(page);
  }



}
