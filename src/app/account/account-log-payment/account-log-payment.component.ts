import { Pay } from '../../_models/pay';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/_services/account.service';

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

  constructor(private accService: AccountService) { }

  ngOnInit(): void {
    this.getPayPage(1);
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
        result = "0";
    } else {
        if (pay.type === 1) {
            result = "+" + pay.money;
        } else if (pay.type === 5 || pay.type === 2 || pay.type === 4) {
            result = "-" + pay.money;
        } else {
            if (pay.sendId.id === 1)
                result = "-" + pay.money;
            else if (pay.receivedId.id === 1)
                result = "+" + pay.money;
        }
    }
    return result;
  }

  getContent(pay: Pay): string{
    var result = "";
    if (pay.type === 1)
        result = "Đã nạp " + pay.money + " đậu vào tài khoản";
    else if (pay.type === 2)
        result = "Thanh toán " + pay.money + " đậu để đổi ngoại hiệu";
    else if (pay.type === 4) {
        result = "Thanh toán " + pay.money + " đậu đề cử " + pay.vote + " Nguyệt Phiếu cho Truyện <a href='/truyen/" + pay.story.id + "'>" + pay.story.name + " </a>";
    } else if (pay.type === 5) {
        result = "Đã đổi " + pay.money + " đậu thành Tiền mặt";
    } else {
        if (pay.sendId.id === 1)
            result = "Thanh toán " + pay.money + " đậu đọc Vip Truyện <a href='/truyen/" + pay.chapter.story.id + "'>" + pay.chapter.story.name + " </a> Chương <a href='/truyen/" + pay.chapter.story.id + "/chuong-" + pay.chapter.id + "'> Chương " + pay.chapter.chapterNumber + " </a>";
        else if (pay.receivedId.id === 1)
            result = "Nhận " + pay.money + " đậu từ Vip Truyện <a href='/truyen/" + pay.chapter.story.id + "'>" + pay.chapter.story.name + " </a> Chương <a href='/truyen/" + pay.chapter.story.id + "/chuong-" + pay.chapter.id + "'> Chương " + pay.chapter.chapterNumber + " </a>";
    }
    return result;
  }
}
