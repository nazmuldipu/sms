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

const routing = RouterModule.forChild([
  {
      path: '', component: DashboardComponent,
      children: [
          { path: 'index', component: IndexComponent },
          { path: 'login', component: LoginComponent },
          { path: 'register', component: RegisterComponent },
          { path: 'roles', component: RolesComponent },
          { path: 'user', component: UserComponent },
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
    UserComponent
  ]
})
export class DashboardModule { }
