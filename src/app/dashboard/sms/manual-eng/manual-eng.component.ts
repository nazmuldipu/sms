import { Component, OnInit } from '@angular/core';
import { SMSService } from '../../../services/sms.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralSMS } from '../../../models/general-sms.model';

@Component({
  selector: 'app-manual-eng',
  templateUrl: './manual-eng.component.html',
})
export class ManualEngComponent implements OnInit {
  manualSMSForm: FormGroup;
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
    this.manualSMSForm = this.builder.group({
      number: ['', [Validators.required, Validators.pattern('^.+8801[0-9][ ]?[0-9]{2}[ ]?[0-9]{3}[ ]?[0-9]{3}$')]],
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
    if (this.manualSMSForm.valid) {
      this.generalSMS.number = this.manualSMSForm.controls.number.value.replace('+', '');
      this.smsService.sendManualEng(this.generalSMS)
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
    this.generalSMS = new GeneralSMS();
    this.createForm();
  }

}
