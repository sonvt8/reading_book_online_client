import { Component, OnInit } from '@angular/core';
import { CodePay } from 'src/app/enum/code-pay.enum';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-account-top-up',
  templateUrl: './account-top-up.component.html',
  styleUrls: ['./account-top-up.component.css']
})
export class AccountTopUpComponent implements OnInit {
  public currentUser: User = new User;
  public qrMoMo: string = CodePay.LINK_PAY_MOMO;
  public qrViettel: string = CodePay.LINK_PAY_VIETTEL;
  public payMessage: string = '';
  
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getUserFromLocalCache();
    this.payMessage = this.currentUser.userId + "-" + this.currentUser.username
  }

}
