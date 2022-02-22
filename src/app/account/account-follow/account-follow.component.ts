import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { Story } from 'src/app/_models/story';
import { AccountService } from 'src/app/_services/account.service';
import { FollowService } from 'src/app/_services/follow.service';
import { NotificationService } from 'src/app/_services/notification.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-account-follow',
  templateUrl: './account-follow.component.html',
  styleUrls: ['./account-follow.component.css']
})
export class AccountFollowComponent implements OnInit, OnDestroy {
  public listStory: Story[] = [];
  public totalPages: number = 0;
  public currentPage: number = 1;
  public lastChapterId: number = 1;
  private subscriptions: Subscription[] = [];
  public pages : number[] = [];
  public datas: dataUserFollowStory[] = [];

  constructor(
    private accService: AccountService, 
    private followService: FollowService,
    private notifyService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.getPage(1);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  deleteFollow(idStory: number, nameStory: string){
    Swal.fire({
      title: 'Bạn muốn huỷ theo dõi?',
      text: 'Bạn đang muốn hủy theo dõi truyện ' + nameStory,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng Ý',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.value) {
        var form = new FormData();
        form.append("storyId", JSON.stringify(idStory));
        this.subscriptions.push(this.followService.cancelFollowStory(form).subscribe(data =>  {
          this.notifyService.notify(NotificationType.SUCCESS,"Bạn đã hủy theo dõi truyện " + nameStory);
          this.getPage(1);
        }, error => this.notifyService.notify(NotificationType.ERROR,error.error.message)
        ));
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        
      }
    })
  }

  getPage(pagenumber: number){
    if (pagenumber === undefined) {
      pagenumber = 1;
    }
    
    this.subscriptions.push(this.accService.getFollowStories(pagenumber)
        .subscribe(data => {
          this.datas = data.content;
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
}

interface dataUserFollowStory {
  chapterId: number,
  story: Story
}
