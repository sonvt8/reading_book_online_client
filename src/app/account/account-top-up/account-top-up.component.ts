import { Pay } from './../../_models/pay';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account-top-up',
  templateUrl: './account-top-up.component.html',
  styleUrls: ['./account-top-up.component.css']
})
export class AccountTopUpComponent implements OnInit, OnDestroy {
  public listPay:Pay[] = [];
  public totalPages: number = 0;
  public currentPage: number = 1;
  private subscriptions: Subscription[] = [];
  public pages : number[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  getPayPage(pagenumber: number){}

}
