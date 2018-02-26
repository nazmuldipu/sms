import { NgModule } from '@angular/core';
import { RestDataSource } from './rest.datasource';
import { AuthService } from './auth.service';
import { RoleService } from './role.service';
import { UserService } from './user.service';

@NgModule({
    providers: [
        AuthService,
        RestDataSource,
        RoleService,
        UserService
    ]

})

export class ServiceModule { }
