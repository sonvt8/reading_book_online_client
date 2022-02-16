import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Chapter } from 'src/app/_models/chapter';
import { Story } from 'src/app/_models/story';
import { ChapterService } from 'src/app/_services/chapter.service';
import { StoryService } from 'src/app/_services/story.service';

@Component({
  selector: 'app-story-detail',
  templateUrl: './story-detail.component.html',
  styleUrls: ['./story-detail.component.css']
})
export class StoryDetailComponent implements OnInit {

  story: Story = new Story();
  listChapter: Chapter[] = [];
  sid: number = 0;
  totalPages: number = 0;
  currentPage: number = 1;
  page : number[] = [];

  private subscriptions: Subscription[] = [];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private storyService: StoryService,
    private chapterService: ChapterService,
    private route: ActivatedRoute, 
  ) { }

  ngOnInit(): void {
    this.renderer.removeAttribute(this.document.body, 'class');
    this.renderer.addClass(this.document.body, 'body-home');
    this.route.paramMap.subscribe(() => {
        this.getChapterListByStoryId(1, 1);
        this.getStoryById();
    });
  }

  getStoryById(): void {
    this.sid = +this.route.snapshot.params['sid'];
    this.storyService.getStoryById(this.sid).subscribe(data => {
      this.story = data;
      console.log(data);
    });
    
  }

  getChapterListByStoryId(pagenumber: number, type: number){

    this.sid = +this.route.snapshot.params['sid'];
    this.subscriptions.push(this.chapterService.getChapterListOfStory(this.sid, pagenumber, type)
        .subscribe(data => {
          this.listChapter = data.content;
          this.currentPage = data.number + 1;
          this.totalPages = data.totalPages;
          var startPage = Math.max(1, this.currentPage - 2);
          var endPage = Math.min(startPage + 4, this.totalPages);
          var pages = [];
          for (let i = startPage; i <= endPage; i++) {
              pages.push(i);
          }
          this.page = pages;
        }
    ));
  }

}
