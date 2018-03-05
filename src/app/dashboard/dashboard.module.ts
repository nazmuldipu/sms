import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { DashboardComponent } from './dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RolesComponent } from './roles/roles.component';
import { UserComponent } from './user/user.component';
import { ClassComponent } from './class/class.component';
import { StudentsComponent } from './students/students.component';

const routing = RouterModule.forChild([
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '', component: DashboardComponent,
    children: [
      { path: 'index', component: IndexComponent },
      { path: 'roles', component: RolesComponent },
      { path: 'user', component: UserComponent },
      { path: 'classes', component: ClassComponent },
      { path: 'students', component: StudentsComponent },
      { path: 'company', loadChildren: 'app/dashboard/company/company.module#CompanyModule' },
      { path: 'sms', loadChildren: 'app/dashboard/sms/sms.module#SMSModule' },
      { path: '**', redirectTo: '/dashboard/index' }
      ]
  },
]);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    routing
  ],
  declarations: [
    IndexComponent,
    NavbarComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    RolesComponent,
    UserComponent,
    ClassComponent,
    StudentsComponent
  ]
})
export class DashboardModule { }
