import { Component, OnInit } from '@angular/core';
import { Company } from '../../models/company.model';
import { Class } from '../../models/class.model';
import { Student } from '../../models/student.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClassService } from '../../services/class.service';
import { CompanyService } from '../../services/company.service';
import { StudentService } from '../../services/student.service';
import { AuthService } from '../../services/auth.service';
import { StudentPage } from '../../models/student-page.model';
/*
  Use Case:
  1) 
    a) for Company List
      i) If localstorage doesn't contain companyId
        -getCompanyList();
      ii) If localstorage contian companyId and admin
        -getCompanyList();
      iii) If localstorage contian companyId and !admin
        -donothing();
    b) for Class List
      i) If localstorage doesn't contain companyId 
        -getCompanyList(); then getClassList();
      ii) If localstorage contain companyId 
        -getClassList(companyId);
      iii) onCompany List change 
        -getClassList(companyId);
        -storCompanyId into localstorage
    c) for studentlist
      i) if localstorage contain classId
        -getStudentList(classId);
      ii) if localstorage does'nt contain classId
        -donothing();
      iii) onClassListChange
        -getStudentList(classId)
*/
@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  arr = Array;
  companyId: number;
  classId: number;
  companyList: Company[] = [];
  classList: Class[] = [];
  student: Student;
  studentPage: StudentPage;
  studentForm: FormGroup;
  message = '';
  errorMessage = '';
  edit = false;
  private locator = (p: Student, id: number) => p.id == id;

  constructor(
    private builder: FormBuilder,
    private authService: AuthService,
    private companyService: CompanyService,
    private classService: ClassService,
    private studentService: StudentService,
  ) {
    this.clear();

    //retreive values from localstorage
    this.companyId = +localStorage.getItem('companyId');
    this.classId = +localStorage.getItem('classId');
  }

  ngOnInit() {
    //Company List
    if (this.companyId == null || this.companyId < 1 || this.authService.hasADMINRole()) {
      this.getCompanyList();
    } else {
      this.getClassList(this.companyId);
    }
    // get student list if classid set on localstorage
    if (this.classId != null && this.classId > 0) {
      this.getStudentPage(this.classId, null);
    }

  }

  createForm() {
    this.studentForm = this.builder.group({
      companyId: [this.companyId],
      classId: [this.classId, Validators.required],
      studentId: ['', Validators.required],
      name: ['', Validators.required],
      nameBangla: [''],
      phone: ['', [Validators.required, Validators.pattern('^.+8801[0-9][ ]?[0-9]{2}[ ]?[0-9]{3}[ ]?[0-9]{3}$')]],
    })
  }

  getStudentPage(classId: number, page: number = null) {
    if (classId > 0) {
      this.studentService.getStudentPage(classId, page)
        .subscribe(
          data => {
            this.studentPage = data;
          },
          error => console.log('Student loading error')
        )
    }
  }

  hasRole(role: string): boolean {
    return this.authService.hasRole(role);
  }

  getCompanyList() {
    this.companyService.getCompanyList()
      .subscribe(
        data => {
          this.companyList = data;
          if (this.companyList.length == 1) {
            // save company info for non admin
            this.companyId = data[0].id;
            this.studentForm.controls.companyId.setValue(this.companyId);
            localStorage.setItem('companyId', this.companyId + '');
            if (this.classId == null || this.classId < 1)
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
          // this.getStudentPage(this.classList[0].id);
        },
        error => {
          console.log('Class loading error', error.status);
        }
      )
  }

  companyChanged(companyId: number) {
    this.companyId = companyId;
    localStorage.setItem('companyId', companyId + '');
    this.getClassList(companyId);
    // this.studentPage
  }

  classChanged(classId: number) {
    this.classId = classId;
    localStorage.setItem('classId', classId + '')
    this.getStudentPage(classId);
  }

  saveStudent() {
    if (this.studentForm.valid) {
      this.student.phone = this.student.phone.replace(/\s/g,'');
      if (!this.edit) {// saving mode
        this.studentService.saveStudent(this.classId, this.student)
          .subscribe(
            data => {
              this.message = 'student saved';
              this.studentPage.content.push(data);
            },
            error => {
              this.errorMessage = 'Student saving filed';
              console.log('Student saving failed ');
            }
          )
      }//end saving mode
      else {//update mode
        this.studentService.updateStudent(this.classId, this.student)
          .subscribe(
            data => {
              this.studentPage.content.splice(this.studentPage.content.findIndex(p => this.locator(p, this.student.id)), 1, data);
              this.message = 'Student updated';
            },
            error => {
              this.errorMessage = 'Student update failed';
              console.log('Student update failed');
            }
          );
      }//end update mode

      this.clear();//clear form
    }//end form validation check
  }//end save student

  editStudent(id: number) {
    this.edit = true;
    Object.assign(this.student, this.studentPage.content.find(p => this.locator(p, id)));

    // Load from server
    // this.studentService.getStudent(id)
    // .subscribe(
    //   data => this.student = data,
    //   error=> this.errorMessage = 'Failed to load !, ' + error
    // )
  }

  deleteStudent(id: number) {
    if (confirm('Are you sure to delete')) {
      this.studentService.deleteStudent(id)
        .subscribe(
          data => {
            this.studentPage.content.splice(this.studentPage.content.findIndex(cus => cus.id === id), 1);
            this.message = 'Student deleted : ' + data.statusText;
          },
          err => {
            console.log('Student Could not delete', 'Failed');
            this.errorMessage = 'Could not delete Student';
          }
        )
    }
  }

  clear() {
    this.student = new Student();
    this.createForm();
    this.studentForm.controls.companyId.setValue(this.companyId);
    this.message = '';
    this.errorMessage = '';
    this.edit = false;
  }
}
