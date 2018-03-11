import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  report;

  constructor(
    private reportService: ReportService
  ) {
    this.getReport();
   }

  ngOnInit() {
  }

  getReport(){
    this.reportService.getReport()
    .subscribe(
      data => this.report = data,
      error => console.log(error)
    )
  }

}
