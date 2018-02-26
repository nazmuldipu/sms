import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserPage } from '../../models/user-page.model';
import { User } from '../../models/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RoleService } from '../../services/role.service';
import { RolesPage } from '../../models/roles-page.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  arr = Array;
  user: User;
  userForm: FormGroup;
  edit = false;
  showPassword = false;
  
  constructor(private builder: FormBuilder,
    private userService: UserService,
    private roleService: RoleService) { 

    this.user = new User();
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.userForm = this.builder.group({
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

  saveUser(){
    console.log(this.user);
    console.log(this.userForm.value);
    console.log(this.userForm.controls.password.errors);
    if(this.userForm.valid){
      this.userService.saveUser(this.user);
      this.user = new User();
      this.edit = false;
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
    this.edit = false;
    this.createForm();
  }

}
