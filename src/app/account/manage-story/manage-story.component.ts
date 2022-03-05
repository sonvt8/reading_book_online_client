import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { Story } from 'src/app/_models/story';
import { AccountService } from 'src/app/_services/account.service';
import { NotificationService } from 'src/app/_services/notification.service';

@Component({
  selector: 'app-manage-story',
  templateUrl: './manage-story.component.html',
  styleUrls: ['./manage-story.component.css']
})
export class ManageStoryComponent implements OnInit, OnDestroy{
  private subscriptions: Subscription[] = [];
  public listOnGoing: Story[] = [];
  public listComplte: Story[] = [];
  public listStop: Story[] = [];
  public listHidden: Story[] = [];

  public totalOnGoingPages: number = 0;
  public currentOnGoingPage: number = 1;
  public onGoingPages : number[] = [];

  public totalCompltePages: number = 0;
  public currentCompltePage: number = 1;
  public compltePages : number[] = [];

  public totalStopPages: number = 0;
  public currentStopPage: number = 1;
  public stopPages : number[] = [];

  public totalHiddenPages: number = 0;
  public currentHiddenPage: number = 1;
  public hidenPages : number[] = [];
  
  constructor(private accService: AccountService,private notifyService: NotificationService) { }

  ngOnInit(): void {
    this.getListStoryOnGoing(1);
    this.getListStoryComplte(1);
    this.getListStoryStop(1);
    this.getListStoryHidden(1);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  storyDelete(id: number){
    this.subscriptions.push(this.accService.deleteStory(id)
        .subscribe(data => {
          this.notifyService.notify(NotificationType.SUCCESS, data.message);
          this.getListStoryOnGoing(1);
        }
    ));
  }

  getListStoryOnGoing(pagenumber: number){
    if (pagenumber === undefined) {
      pagenumber = 1;
    }
    const status = 1; /* Get list stories on going */
    this.subscriptions.push(this.accService.getStoryAccount(pagenumber, status)
        .subscribe(data => {
          this.listOnGoing = data.content;
          this.currentOnGoingPage = data.number + 1;
          this.totalOnGoingPages = data.totalPages;
          var startPage = Math.max(1, this.currentOnGoingPage - 2);
          var endPage = Math.min(startPage + 4, this.totalOnGoingPages);
          var tmpPages = [];
          for (let i = startPage; i <= endPage; i++) {
            tmpPages.push(i);
          }
          this.onGoingPages = tmpPages;
        }
    ));
  }

  getListStoryComplte(pagenumber: number){
    if (pagenumber === undefined) {
      pagenumber = 1;
    }
    const status = 3; /* Get list fully done stories */
    this.subscriptions.push(this.accService.getStoryAccount(pagenumber, status)
        .subscribe(data => {
          this.listComplte = data.content;
          this.currentCompltePage = data.number + 1;
          this.totalCompltePages = data.totalPages;
          var startPage = Math.max(1, this.currentCompltePage - 2);
          var endPage = Math.min(startPage + 4, this.totalCompltePages);
          var tmpPages = [];
          for (let i = startPage; i <= endPage; i++) {
            tmpPages.push(i);
          }
          this.compltePages = tmpPages;
        }
    ));
  }

  getListStoryStop(pagenumber: number){
    if (pagenumber === undefined) {
      pagenumber = 1;
    }
    const status = 2; /* Get list pending stories */
    this.subscriptions.push(this.accService.getStoryAccount(pagenumber, status)
        .subscribe(data => {
          this.listStop = data.content;
          this.currentStopPage = data.number + 1;
          this.totalStopPages = data.totalPages;
          var startPage = Math.max(1, this.currentStopPage - 2);
          var endPage = Math.min(startPage + 4, this.totalStopPages);
          var tmpPages = [];
          for (let i = startPage; i <= endPage; i++) {
            tmpPages.push(i);
          }
          this.stopPages = tmpPages;
        }
    ));
  }

  getListStoryHidden(pagenumber: number){
    if (pagenumber === undefined) {
      pagenumber = 1;
    }
    const status = 0; /* Get list locked stories */
    this.subscriptions.push(this.accService.getStoryAccount(pagenumber, status)
        .subscribe(data => {
          this.listHidden = data.content;
          this.currentHiddenPage = data.number + 1;
          this.totalHiddenPages = data.totalPages;
          var startPage = Math.max(1, this.currentHiddenPage - 2);
          var endPage = Math.min(startPage + 4, this.totalHiddenPages);
          var tmpPages = [];
          for (let i = startPage; i <= endPage; i++) {
            tmpPages.push(i);
          }
          this.hidenPages = tmpPages;
        }
    ));
  }
}
