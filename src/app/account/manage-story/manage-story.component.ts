import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Story } from 'src/app/_models/story';

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
  
  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  storyDelete(id: number, name: string){}

  getListStoryOnGoing(pagenumber: number){
    if (pagenumber === undefined) {
      pagenumber = 1;
    }
    
    // this.subscriptions.push(this.accService.getPaymentHistory(pagenumber)
    //     .subscribe(data => {
    //       this.listPay = data.content;
    //       this.currentPage = data.number + 1;
    //       this.totalPages = data.totalPages;
    //       var startPage = Math.max(1, this.currentPage - 2);
    //       var endPage = Math.min(startPage + 4, this.totalPages);
    //       var tmpPages = [];
    //       for (let i = startPage; i <= endPage; i++) {
    //         tmpPages.push(i);
    //       }
    //       this.pages = tmpPages;
    //     }
    // ));
  }

  getListStoryComplte(pagenumber: number){
    if (pagenumber === undefined) {
      pagenumber = 1;
    }
  }

  getListStoryStop(pagenumber: number){
    if (pagenumber === undefined) {
      pagenumber = 1;
    }
  }

  getListStoryHidden(pagenumber: number){
    if (pagenumber === undefined) {
      pagenumber = 1;
    }
  }
}
