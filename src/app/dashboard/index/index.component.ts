import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  report;

  constructor(
    private reportService: ReportService,
    private authService: AuthService
  ) {
    this.getReport();
   }

  ngOnInit() {
  }

  hasRole(role: string): boolean {
    return this.authService.hasRole(role);
  }

  getReport(){
    this.reportService.getReport()
    .subscribe(
      data => this.report = data,
      error => console.log(error)
    )
  }


}
