import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GeneralSMS } from '../../../models/general-sms.model';
import { SMSService } from '../../../services/sms.service';

@Component({
  selector: 'app-all-student-bd',
  templateUrl: './all-student-bd.component.html',
})
export class AllStudentBdComponent implements OnInit {
  allStudentForm: FormGroup;
  generalSMS: GeneralSMS;
  message = '';
  errorMessage = '';
  
  constructor(
    private smsService: SMSService,
    private builder: FormBuilder
  ) {
    this.generalSMS = new GeneralSMS();
    this.createForm();
   }

  ngOnInit() {
  }

  createForm() {
    this.allStudentForm = this.builder.group({
      message: ['', [Validators.required, Validators.maxLength(70)]]
    });
  }

  send() {
    if (this.allStudentForm.valid) {
      this.smsService.sendAllBd(this.generalSMS)
        .subscribe(
          data => {
            this.message = '';
            data.forEach(resp => {
              this.message += resp.number + ': ' + resp.result + ';  ';
            });
          },
          error => this.errorMessage = error,
        )
    }
  }

  clear() {
    this.message = '';
    this.errorMessage = '';
  }

}
