import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Chapter } from 'src/app/_models/chapter';
import { AuthService } from 'src/app/_services/auth.service';
import { ChapterService } from 'src/app/_services/chapter.service';
import { StoryService } from 'src/app/_services/story.service';

@Component({
  selector: 'app-chapter-detail',
  templateUrl: './chapter-detail.component.html',
  styleUrls: ['./chapter-detail.component.css']
})
export class ChapterDetailComponent implements OnInit, OnDestroy {

  chapter: Chapter = new Chapter();
  preChapter: number = 0;
  nextChapter: number = 0;
  checkVip: boolean = false;
  isLoggedIn: boolean = false;
  sid: number = 0;
  chid: number = 0;
  noImage = 'https://res.cloudinary.com/thang1988/image/upload/v1544258290/truyenmvc/noImages.png';

  private subscriptions: Subscription[] = [];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private storyService: StoryService,
    private chapterService: ChapterService,
    private route: ActivatedRoute, 
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.renderer.removeAttribute(this.document.body, 'class');
    this.renderer.addClass(this.document.body, 'body-home');
    this.renderer.addClass(this.document.body, 'page-read');
    this.route.paramMap.subscribe(() => {
    this.sid = this.route.snapshot.params['sid'];
    this.chid = this.route.snapshot.params['chid'];
    
      if(this.isLoggedIn){
        this.getAccountChapterByStoryIdAndChapterId();
      } else {
        this.getChapterByStoryIdAndChapterId();
      }
    });
  }

  getAccountChapterByStoryIdAndChapterId(){
    this.subscriptions.push(this.chapterService.getAccountChapterByStoryIdAndChapterId(this.sid, this.chid)
        .subscribe(data => {
          this.chapter = data.chapter;
          this.preChapter = data.preChapter;
          this.nextChapter = data.nextChapter;
          this.checkVip = data.checkVip;
          console.log("da dang nhap");
        }
    ));
  }

  getChapterByStoryIdAndChapterId(){
    this.subscriptions.push(this.chapterService.getChapterByStoryIdAndChapterId(this.sid, this.chid)
        .subscribe(data => {
          this.chapter = data.chapter;
          this.preChapter = data.preChapter;
          this.nextChapter = data.nextChapter;
          this.checkVip = data.checkVip;
          console.log("chua dang nhap");
        }
    ));
  }

  // config: SwiperOptions = {
  //   navigation: true,
  //   pagination: {
  //     clickable: true
  //   }
  // }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
