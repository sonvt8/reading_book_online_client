import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { Pay } from 'src/app/_models/pay';
import { AccountService } from 'src/app/_services/account.service';
import { DataService } from 'src/app/_services/data.service';
import { NotificationService } from 'src/app/_services/notification.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-account-withdraw',
  templateUrl: './account-withdraw.component.html',
  styleUrls: ['./account-withdraw.component.css']
})
export class AccountWithdrawComponent implements OnInit, OnDestroy {
  public loading = false;
  public submitted = false;
  public listPay:Pay[] = [];
  public totalPages: number = 0;
  public currentPage: number = 1;
  private subscriptions: Subscription[] = [];
  public pages : number[] = [];

  public drawMoney = 0;
  public drawCoin = 0;

  constructor(
    private accService: AccountService,
    private notifyService: NotificationService,
    private dataService: DataService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

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
    
    this.subscriptions.push(this.accService.withdrawList(pagenumber)
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
  deleteDraw(id: number){}

  changeValue(){
    this.drawCoin = this.drawMoney + (this.drawMoney * 0.1);
  }

  resetWithdrawForm(withdrawForm: NgForm){
    this.drawMoney = 0;
    this.drawCoin = 0;
  }

  submitWithDraw(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.drawMoney < 50000) {
      this.notifyService.notify(NotificationType.ERROR,"Số tiền rút không hợp lệ");
      return;
    }

    this.loading = true;

    var formData: any = new FormData();
    formData.append("moneyVND",  this.drawMoney);
    formData.append("money", this.drawCoin);

    this.subscriptions.push(
      this.accService.withdraw(formData).subscribe(
        (response: any) => {
          Swal.fire({
            text: "Đẵ thực hiện rút " + this.drawCoin + " đậu thành công, vui lòng kiểm tra mail để biết thông tin giao dịch!",
            icon: 'success',
            confirmButtonText: 'Ok'
          })
          this.resetWithdrawForm;
          this.loading = false;
          this.submitted = false;
          this.dataService.updateStatus(5);
          this.router.navigate([this.router.url]);
        },error => {
          this.loading = false;
        },
        () => {
          this.submitted = false;
          this.resetWithdrawForm;
        }
      )
    );
  }
}
