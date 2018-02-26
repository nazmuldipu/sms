import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  show = false;
  
  constructor(public auth: AuthService) {}

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
}
