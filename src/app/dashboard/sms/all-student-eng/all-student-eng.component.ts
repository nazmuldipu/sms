import { Component, OnInit } from '@angular/core';
import { SMSService } from '../../../services/sms.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GeneralSMS } from '../../../models/general-sms.model';

@Component({
  selector: 'app-all-student-eng',
  templateUrl: './all-student-eng.component.html',
})
export class AllStudentEngComponent implements OnInit {
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
      message: ['', [Validators.required, Validators.maxLength(160)]]
    });
  }

  // Remove non ascii key from name
  nameKeyup(value: string) {
    if (value != null) {
      this.generalSMS.message = value.replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
    }
  }

  send() {
    if (this.allStudentForm.valid) {
      this.smsService.sendAllEng(this.generalSMS)
        .subscribe(
          data => {
            this.message = '';
            console.log(data);
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
