import { NgModule } from '@angular/core';
import { RestDataSource } from './rest.datasource';
import { AuthService } from './auth.service';
import { RoleService } from './role.service';
import { UserService } from './user.service';
import { CompanyService } from './company.service';
import { ClassService } from './class.service';
import { StudentService } from './student.service';
import { SMSService } from './sms.service';

@NgModule({
    providers: [
        AuthService,
        RestDataSource,
        RoleService,
        UserService,
        CompanyService,
        ClassService,
        StudentService,
        SMSService
    ]

})

export class ServiceModule { }
