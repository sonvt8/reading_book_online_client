import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { Chapter } from 'src/app/_models/chapter';
import { Story } from 'src/app/_models/story';
import { ChapterService } from 'src/app/_services/chapter.service';
import { DataService } from 'src/app/_services/data.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { StoryService } from 'src/app/_services/story.service';

declare var $: any;

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css']
})
export class ChapterComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public storyId: number = 0;
  public story: Story = new Story();

  public listChapter:Chapter[] = [];
  public totalPages: number = 0;
  public currentPage: number = 1;
  public pages : number[] = [];

  public typeList = [
    {'id': 0, 'label': 'Thứ Tự Cao xuống Thấp'},
    {'id': 1, 'label': 'Thứ Tự Thấp đến Cao '},
    {'id': 2, 'label': 'Ngày Đăng Từ Mới đến Cũ'},
    {'id': 3, 'label': 'Ngày Đăng Từ Cũ đến Mới'}
  ];
  public type = this.typeList[0];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private chapterService: ChapterService,
    private storyService: StoryService,
    private notifyService: NotificationService
  ) { }

  ngOnInit(): void { 
    this.showSelect();
    this.storyId = +this.route.snapshot.params['sid'];
    this.getChapterListByStoryId(1);
    this.getStoryDetail();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  deleteChapter(id: number): void {}

  getChapterListByStoryId(pagenumber: number) {
    this.subscriptions.push(this.chapterService.getChapterUserByStoryId(this.storyId, pagenumber, this.type.id)
      .subscribe(data => {
        this.listChapter = data.content;
        this.currentPage = data.number + 1;
        this.totalPages = data.totalPages;
        var startPage = Math.max(1, this.currentPage - 2);
        var endPage = Math.min(startPage + 4, this.totalPages);
        var tmpPages = [];
        for (let i = startPage; i <= endPage; i++) {
          tmpPages.push(i);
        }
        this.pages = tmpPages;
      }, error => this.notifyService.notify(NotificationType.ERROR,error.error.message)
    ));
  }

  getStoryDetail(){
    this.subscriptions.push(this.storyService.getStoryById(this.storyId).subscribe(
      response => {
          this.story = response.storySummary;
      }, error => this.notifyService.notify(NotificationType.ERROR,error.error.message)
    ));
  }

  showSelect(){
    $(document).ready(function () {
      $('.mdb-select').materialSelect();
    });
  }
}
