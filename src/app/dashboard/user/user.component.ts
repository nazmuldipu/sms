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
  user: User;
  userForm: FormGroup;
  companyList: Company[] = [];
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
  }

  ngOnInit() {
  }

  createForm() {
    this.userForm = this.builder.group({
      companyId: ['', Validators.required],
      name: ['', Validators.required ],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(6), Validators.required]],
      roles: '',
      active: false,
    });
  }
  
  get message(): string{
    return this.userService.getMessage();
  }
  get errMessage(): string{
    return this.userService.getErrorMessage();
  }

  get userPage():UserPage{
    return this.userService.getUsers();
  }

  get rolesPage(): RolesPage{
    return this.roleService.getRoles();
  }

  getUserPage(page: number = null){
    this.userService.getUserPage(page);
  }

  getCompanyList(){
    this.companyService.getCompanyList()
    .subscribe(
      data =>{
        this.companyList=data;
        // this.companyId = data[0].id;
        console.log(this.companyList);
      }
    )
  }

  saveUser(){
    console.log(this.user);
    // console.log(this.userForm.value);
    // console.log(this.userForm.controls.password.errors);
    if(this.userForm.valid){
      this.userService.saveUser(this.user);
      this.clear();      
    }
  }

  editUser(id: number){
    this.edit = true;
    this.user = this.userService.getUser(id);
  }

  deleteUser(id:number){
    if (confirm('Are you sure to delete')) {
      this.userService.deleteUser(id);
    }
  }

  clear(){
    this.user = new User();
    this.user.companyInfo = new Company();
    this.user.roles = new Array<Role>();
    this.edit = false;
    this.createForm();
  }

}
