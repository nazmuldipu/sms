import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CompanyComponent } from './company.component';
import { IndexComponent } from './index/index.component';
import { AddComponent } from './add/add.component';
import { StudentLimitComponent } from './student-limit/student-limit.component';
import { BuySmsComponent } from './buy-sms/buy-sms.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CompanyListComponent } from './childs/company-list.component';
import { AddCompanyComponent } from './childs/add-company.component';

const routing = RouterModule.forChild([
  {
      path: '', component: CompanyComponent,
      children: [
          { path: 'index', component: IndexComponent },
          { path: 'add', component: AddComponent },
          { path: 'studentLimit', component: StudentLimitComponent },
          { path: 'buySMS', component: BuySmsComponent },

          { path: '**', redirectTo: '/dashboard/company/index' }
      ]
  },
]);

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    routing
  ],
  declarations: [
    CompanyComponent,
    IndexComponent,
    AddComponent,
    StudentLimitComponent,
    BuySmsComponent,
    CompanyListComponent,
    AddCompanyComponent
  ]
})
export class CompanyModule { }

