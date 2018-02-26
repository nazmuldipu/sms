import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <app-dashboard-navbar></app-dashboard-navbar>
    <router-outlet></router-outlet>
  `
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
