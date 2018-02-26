import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-dashboard-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    show = false;
    
    constructor(public auth: AuthService) {
    }

    ngOnInit() {
    }

    get username(): string {
        return this.auth.getUsername();
    }

    hasRole(role: string):boolean{
        return this.auth.hasRole(role);
    }
    isLogged():boolean{
        return this.auth.isAuthenticated();
    }
    toggleCollapse() {
        this.show = !this.show;
    }
    logout() {
        this.toggleCollapse();
        this.auth.clear();
    }
    jsUcfirst(string) {
        console.log('ROLE : '  + string);
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}
