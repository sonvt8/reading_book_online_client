import { Pay } from '../../_models/pay';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/_services/account.service';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'account-log-payment',
  templateUrl: './account-log-payment.component.html',
  styleUrls: ['./account-log-payment.component.css']
})
export class AccountLogPaymentComponent implements OnInit, OnDestroy {
  public listPay:Pay[] = [];
  public totalPages: number = 0;
  public currentPage: number = 1;
  private subscriptions: Subscription[] = [];
  public pages : number[] = [];
  currentUser : User = new User;

  constructor(private accService: AccountService, private auth: AuthService) { }

  ngOnInit(): void {
    this.getPayPage(1);
    
    this.currentUser = this.auth.getUserFromLocalCache();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  getPayPage(pagenumber: number){
    if (pagenumber === undefined) {
      pagenumber = 1;
    }
    
    this.subscriptions.push(this.accService.getPaymentHistory(pagenumber)
        .subscribe(data => {
          this.listPay = data.content;

          for(let pay of this.listPay){
            console.log(pay.type);
            console.log(this.getContent(pay));
          }
          
          this.currentPage = data.number + 1;
          this.totalPages = data.totalPages;
          var startPage = Math.max(1, this.currentPage - 2);
          var endPage = Math.min(startPage + 4, this.totalPages);
          var tmpPages = [];
          for (let i = startPage; i <= endPage; i++) {
            tmpPages.push(i);
          }
          this.pages = tmpPages;
        }
    ));
  }

  getMoney(pay: Pay): string{
    var result = "";
    if (pay.status === 0) {
        result = "0"; //for canceled payment
    } else {
        if (pay.type === 1) {
            result = "+" + pay.money; //for top-up payment
        } else if (pay.type === 5 || pay.type === 2 || pay.type === 4) {
            result = "-" + pay.money;
        } else {
            //for buying vip chapter
            if (pay.sendId.id === this.currentUser.id)
                result = "-" + pay.money;
            else if (pay.receivedId.id === this.currentUser.id)
                result = "+" + pay.money;
        }
    }
    return result;
  }

  getContent(pay: Pay): string{
    var result = "";
    if (pay.type === 1)
        result = "???? n???p " + pay.money + " ?????u v??o t??i kho???n";
    else if (pay.type === 2)
        result = "Thanh to??n " + pay.money + " ?????u ????? ?????i ngo???i hi???u";
    else if (pay.type === 4) {
        result = "Thanh to??n " + pay.money + " ?????u ????? c??? " + pay.vote + " Nguy???t Phi???u cho Truy???n <a routerLink='/truyen-home/" + pay.story.id + "'>" + pay.story.name + " </a>";
    } else if (pay.type === 5) {
        result = "???? ?????i " + pay.money + " ?????u th??nh Ti???n m???t";
    } else {
        if (pay.sendId.id === this.currentUser.id)
            result = "Thanh to??n " + pay.money + " ?????u ?????c Vip Truy???n <a href='/truyen-home/" + pay.chapter.story.id + "'>" + pay.chapter.story.name + " </a><a href='/truyen-home/" + pay.chapter.story.id + "/" + pay.chapter.id + "'> Ch????ng " + pay.chapter.chapterNumber + " </a>";
        else if (pay.receivedId.id === this.currentUser.id)
            result = "Nh???n " + pay.money + " ?????u t??? Vip Truy???n <a routerLink=='/truyen-home/" + pay.chapter.story.id + "'>" + pay.chapter.story.name + " </a><a href='/truyen-home/" + pay.chapter.story.id + "/" + pay.chapter.id + "'> Ch????ng " + pay.chapter.chapterNumber + " </a>";
    }
    return result;
    
  }
}
