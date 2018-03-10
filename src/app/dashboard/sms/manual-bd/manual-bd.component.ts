import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GeneralSMS } from '../../../models/general-sms.model';
import { SMSService } from '../../../services/sms.service';

@Component({
  selector: 'app-manual-bd',
  templateUrl: './manual-bd.component.html',
})
export class ManualBdComponent implements OnInit {
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

  createForm() {
    this.manualSMSForm = this.builder.group({
      number: ['', [Validators.required, Validators.pattern('^.+8801[0-9][ ]?[0-9]{2}[ ]?[0-9]{3}[ ]?[0-9]{3}$')]],
      message: ['', [Validators.required, Validators.maxLength(70)]]
    });
  }

  ngOnInit() {
  }

  send() {
    if (this.manualSMSForm.valid) {
      this.generalSMS.number = this.manualSMSForm.controls.number.value.replace('+', '');
      this.smsService.sendManualBd(this.generalSMS)
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
