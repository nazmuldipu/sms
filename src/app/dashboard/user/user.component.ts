import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserPage } from '../../models/user-page.model';
import { User } from '../../models/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RoleService } from '../../services/role.service';
import { RolesPage } from '../../models/roles-page.model';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../models/company.model';
import { Role } from '../../models/role.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  arr = Array;
  roleList: Role[];
  userPage: UserPage;
  user: User;
  userForm: FormGroup;
  companyList: Company[] = [];
  message = '';
  errMessage = '';
  edit = false;
  showPassword = false;

  constructor(private builder: FormBuilder,
    private userService: UserService,
    private companyService: CompanyService,
    private roleService: RoleService) {

    this.user = new User();
    this.user.companyInfo = new Company();
    this.user.roles = new Array<Role>();
    this.createForm();

    this.getCompanyList();
    this.getUserPage();
    this.getRolesList();
  }

  ngOnInit() {
  }

  createForm() {
    this.userForm = this.builder.group({
      companyId: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(6), Validators.required]],
      roles: '',
      active: false,
    });
  }

  getUserPage(page: number = null) {
    this.userService.getUserPage(page)
      .subscribe(
        data => this.userPage = data,
        error => this.errMessage = 'User list could not load ' + error.status,
    );
  }

  getRolesList() {
    this.roleService.getRoleList()
      .subscribe(
        data => this.roleList = data,
        error => this.errMessage = 'Role could not load ' + error.status
      )
  }

  getCompanyList() {
    this.companyService.getCompanyList()
      .subscribe(
        data => {
          this.companyList = data;
        }
      )
  }

  saveUser() {
    if (this.userForm.valid) {
      if (this.user.id == null || this.user.id == 0) {
        this.userService.saveUser(this.user)
          .subscribe(
            data => {
              this.userPage.content.push(data);
              this.message = 'User Saved';
            },
            error => this.errMessage = 'Error! User could not saved,' + error.status,
        )
      } else {
        this.userService.updateUser(this.user)
          .subscribe(
            data => {
              this.userPage.content.splice(this.userPage.content.findIndex(p => p.id == data.id), 1, data);
              this.message = 'User Updated';
            },
            error => this.errMessage = 'Error! User could not update,' + error.status,
        )
      }
      this.clear();
    }
  }

  editUser(id: number) {
    this.edit = true;
    Object.assign(this.user, this.userPage.content.find(p => p.id == id));
    // this.user = this.userService.getUser(id);
  }

  deleteUser(id: number) {
    if (confirm('Are you sure to delete')) {
      this.userService.deleteUser(id)
        .subscribe(
          data => {
            this.userPage.content.splice(this.userPage.content.findIndex(cus => cus.id == id), 1);
            this.message = 'User deleted : ' + data.statusText;
          },
      )
    }
  }

  clear() {
    this.user = new User();
    this.user.companyInfo = new Company();
    this.user.roles = new Array<Role>();
    this.edit = false;
    this.createForm();
    this.message = '';
    this.errMessage = '';
  }

}
