import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { RolesPage } from '../../models/roles-page.model';
import { Role } from '../../models/role.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  arr = Array;
  role: Role;
  roleForm: FormGroup;
  edit = false;

  constructor(private builder: FormBuilder, private rolesService : RoleService) {
    this.role = new Role();
    this.createForm();
  }
  
  ngOnInit() {
  }

  createForm() {
    this.roleForm = this.builder.group({
      name: ['', Validators.required ],
    });
  }
  
  get message(): string{
    return this.rolesService.getMessage();
  }
  get errMessage(): string{
    return this.rolesService.getErrorMessage();
  }

  get rolesPage():RolesPage{
    return this.rolesService.getRoles();
  }

  getRolesPage(page: number = null){
    this.rolesService.getRolesPage(page);
  }

  saveRole(){
    if(this.roleForm.valid){
      this.rolesService.saveRoles(this.role);
      this.role = new Role();
      this.edit = false;
    }
  }

  editRole(id: number){
    if(id != 1){
      this.edit = true;
      this.role = this.rolesService.getRole(id);
    }
  }

  deleteRole(id: number){
    if (confirm('Are you sure to delete')) {
      this.rolesService.deleteRole(id);
    }
  }

  clear(){
    this.role = new Role();
    this.edit = false;
  }

}
