import { Component, OnInit } from '@angular/core';
import { Class } from '../../models/class.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClassService } from '../../services/class.service';
import { ClassPage } from '../../models/class-page.model';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../models/company.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {
  arr = Array;
  companyId: number;
  companyList: Company[] = [];
  class: Class;
  classForm: FormGroup;
  classPage: ClassPage;
  message = '';
  errMessage = '';
  edit = false;

  constructor(
    private builder: FormBuilder,
    private authService: AuthService,
    private classService: ClassService,
    private companyService: CompanyService
  ) {

    this.class = new Class();
    this.companyId = +localStorage.getItem('companyId');
    this.createForm();
    this.classService.clear();

    this.getCompanyList();
    if (this.companyId > 0) {
      this.getClassPage();
    }
  }

  ngOnInit() {
  }

  hasRole(role: string): boolean {
    return this.authService.hasRole(role);
  }

  createForm() {
    this.classForm = this.builder.group({
      companyId: [this.companyId, Validators.required],
      classId: ['', Validators.required],
      className: ['', Validators.required],
    });
  }

  getClassPage(page: number = null) {
    this.classService.getClassPage(this.companyId, page)
      .subscribe(
        data => this.classPage = data,
        error => this.errMessage = 'Class loading error ' + error.status,
    )
  }


  getCompanyList() {
    this.companyService.getCompanyList()
      .subscribe(
        data => {
          this.companyList = data;
          if (data.length == 1) {
            this.companyId = data[0].id;
            this.classForm.controls.companyId.setValue(this.companyId);
            localStorage.setItem('companyId', this.companyId + '');
            // this.getClassPage(this.companyId);
          }
        }
      )
  }

  companyChanged(companyId: number) {
    this.companyId = companyId;
    localStorage.setItem('companyId', companyId + '');
    this.getClassPage();
  }

  saveClass() {
    if (this.classForm.valid) {
      if (this.class.id == null || this.class.id == 0) {
        this.classService.saveClass(this.class, this.companyId)
          .subscribe(
            data => {
              this.classPage.content.push(data);
              this.message = 'Class Saved';
            },
            error => this.errMessage = 'Error! Class could not saved,' + error.status,
        )
      } else {
        this.classService.updateClss(this.class, this.companyId)
        .subscribe(
          data => {
            this.classPage.content.splice(this.classPage.content.findIndex(p => p.id == data.id), 1, data);
            this.message = 'Class Updated';
          },
          error => this.errMessage = 'Error! Clas could not update,' + error.status,
      )
      }
      this.class = new Class();
      this.createForm();
      // this.classForm.controls.compnayId.setValue(this.companyId);
      this.edit = false;
    }
  }

  editClass(id: number) {
    this.edit = true;
    Object.assign(this.class, this.classPage.content.find(p => p.id == id));
  }

  deleteClass(id: number) {
    if (confirm('Are you sure to delete')) {
      this.classService.deleteClass(id)
      .subscribe(
        data => {
          this.classPage.content.splice(this.classPage.content.findIndex(cus => cus.id == id), 1);
          this.message = 'Role deleted : ' + data.statusText;
        },
        error => this.errMessage = 'Role could not delete :' + error.status,
    )
    }
  }

  clear() {
    this.class = new Class();
    // this.class.
    this.edit = false;
    this.createForm()
    this.message = '';
    this.errMessage = '';
  }

}
