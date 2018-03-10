import { Component, OnInit } from '@angular/core';
import { SMSService } from '../../../services/sms.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
})
export class BalanceComponent implements OnInit {
  balance = '';
  
  constructor(
    private smsService: SMSService,
    auth: AuthService
  ) { 
    this.getBalance();
  }

  ngOnInit() {
  }

  getBalance(){
    this.smsService.getBalance()
    .subscribe(
      data =>{
        this.balance = data+'';
      },
      error => console.log(error)
    )
  }

}
