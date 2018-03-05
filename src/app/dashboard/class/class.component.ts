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
    if(this.companyId > 0){
      this.classService.getClassPage(this.companyId);
    }
   }

  ngOnInit() {
  }

  createForm() {
    this.classForm = this.builder.group({
      companyId: [this.companyId, Validators.required],
      classId: ['', Validators.required ],
      className: ['', Validators.required],
    });
  }

  get message(): string{
    return this.classService.getMessage();
  }
  get errMessage(): string{
    return this.classService.getErrorMessage();
  }

  get classPage():ClassPage{
    return this.classService.getClasses();
  }

  getClassPage(page: number = null){
    this.classService.getClassPage(page);
  }

  hasRole(role: string):boolean{
    return this.authService.hasRole(role);
  }

  getCompanyList(){
    this.companyService.getCompanyList()
    .subscribe(
      data =>{
        this.companyList=data;
        if(data.length == 1){
          this.companyId = data[0].id;
          this.classForm.controls.companyId.setValue(this.companyId);
          localStorage.setItem('companyId', this.companyId+'');
          // this.getClassPage(this.companyId);
        }
      }
    )
  }

  companyChanged(companyId: number){
    this.companyId = companyId;
    localStorage.setItem('companyId', companyId+'');
    this.classService.getClassPage(companyId);
  }

  saveClass(){
    console.log(this.class);
    if(this.classForm.valid){
      this.classService.saveClass(this.class, this.companyId);
      this.class = new Class();
      this.createForm();
      // this.classForm.controls.compnayId.setValue(this.companyId);
      this.edit = false;
    }
  }

  editClass(id: number){
    this.edit = true;
    Object.assign(this.class, this.classService.getClass(id));
    // this.class = this.classService.getClass(id);
  }

  deleteClass(id:number){
    if (confirm('Are you sure to delete')) {
      this.classService.deleteClass(id);
    }
  }

  clear(){
    // this.createForm();
    this.class = new Class();
    this.edit = false;
    
    // this.classForm.controls.compnayId.setValue(this.companyId);
    this.classService.message = '';
    this.classService.errMessage = '';
  }

}
