import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SMSComponent } from './sms.component';
import { AllStudentEngComponent } from './all-student-eng/all-student-eng.component';
import { AllStudentBdComponent } from './all-student-bd/all-student-bd.component';
import { ClasswiseEngComponent } from './classwise-eng/classwise-eng.component';
import { ClasswiseBdComponent } from './classwise-bd/classwise-bd.component';
import { AbsentEngComponent } from './absent-eng/absent-eng.component';
import { AbsentBdComponent } from './absent-bd/absent-bd.component';
import { ResultEngComponent } from './result-eng/result-eng.component';
import { ResultBdComponent } from './result-bd/result-bd.component';
import { ManualEngComponent } from './manual-eng/manual-eng.component';
import { ManualBdComponent } from './manual-bd/manual-bd.component';
import { BalanceComponent } from './balance/balance.component';
import { HistoryComponent } from './history/history.component';


const routing = RouterModule.forChild([
  {
      path: '', component: SMSComponent,
      children: [
          { path: 'all-student-eng', component: AllStudentEngComponent },
          { path: 'all-student-bd', component: AllStudentBdComponent },
          { path: 'class-student-eng', component: ClasswiseEngComponent },
          { path: 'class-student-bd', component: ClasswiseBdComponent },
          { path: 'absent-eng', component: AbsentEngComponent },
          { path: 'absent-bd', component: AbsentBdComponent },
          { path: 'result-eng', component: ResultEngComponent },
          { path: 'result-bd', component: ResultBdComponent },
          { path: 'manual-eng', component: ManualEngComponent },
          { path: 'manual-bd', component: ManualBdComponent },
          { path: 'balance', component: BalanceComponent },
          { path: 'history', component: HistoryComponent },

          { path: '**', redirectTo: '/dashboard/index' }
      ]
  },
]);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    routing
  ],
  declarations: [
    SMSComponent,
    AllStudentEngComponent,
    AllStudentBdComponent,
    ClasswiseEngComponent,
    ClasswiseBdComponent,
    AbsentEngComponent,
    AbsentBdComponent,
    ResultEngComponent,
    ResultBdComponent,
    ManualEngComponent,
    ManualBdComponent,
    BalanceComponent,
    HistoryComponent,
  ]
})
export class SMSModule { }
