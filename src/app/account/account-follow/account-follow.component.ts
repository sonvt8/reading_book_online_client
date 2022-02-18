import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Story } from 'src/app/_models/story';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-account-follow',
  templateUrl: './account-follow.component.html',
  styleUrls: ['./account-follow.component.css']
})
export class AccountFollowComponent implements OnInit, OnDestroy {
  public listStory: Story[] = [];
  public totalPages: number = 0;
  public currentPage: number = 1;
  private subscriptions: Subscription[] = [];
  public pages : number[] = [];
  public datas: dataUserFollowStory[] = [];

  constructor(private accService: AccountService) { }

  ngOnInit(): void {
    this.getPage(1);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  deleteFollow(id: number, name: string){}

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
