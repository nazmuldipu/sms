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
  rolesPage: RolesPage;
  roleForm: FormGroup;
  role: Role;
  edit = false;
  message = '';
  errMessage = '';
  private locator = (p: Role, id: number) => p.id == id;

  constructor(private builder: FormBuilder, private rolesService: RoleService) {
    this.role = new Role();
    this.createForm();
    this.getRolesPage();
  }

  ngOnInit() {
  }

  createForm() {
    this.roleForm = this.builder.group({
      name: ['', Validators.required],
    });
  }


  getRolesPage(page: number = null) {
    this.rolesService.getRolesPage(page)
      .subscribe(
        data => this.rolesPage = data,
        error => this.errMessage = error,
    )
  }

  saveRole() {
    if (this.roleForm.valid) {
      if (this.role.id == null || this.role.id == 0) {
        this.rolesService.saveRoles(this.role)
          .subscribe(
            data => {
              this.rolesPage.content.push(data);
              this.message = 'Role Saved';
            },
            error => this.errMessage = 'Error! Role could not saved,' + error.status,
        )
      } else {
        this.rolesService.updateRole(this.role)
          .subscribe(
            data => {
              this.rolesPage.content.splice(this.rolesPage.content.findIndex(p => p.id == data.id), 1, data);
              this.message = 'Role Updated';
            },
            error => this.errMessage = 'Error! Role could not update,' + error.status,
        )
      }
      this.clear();
    }
  }

  editRole(id: number) {
    if (id != 1) {
      this.edit = true;
      Object.assign(this.role, this.rolesPage.content.find(p => this.locator(p, id)));
      // this.role = this.rolesPage.content.find(p => this.locator(p, id));
    }
  }

  deleteRole(id: number) {
    if (confirm('Are you sure to delete')) {
      this.rolesService.deleteRole(id)
        .subscribe(
          data => {
            this.rolesPage.content.splice(this.rolesPage.content.findIndex(cus => cus.id == id), 1);
            this.message = 'Role deleted : ' + data.statusText;
          },
          error => this.errMessage = 'Role could not delete :' + error.status,
      )
    }
  }

  clear() {
    this.role = new Role();
    this.edit = false;
    this.message = '';
    this.errMessage = '';
  }

}
