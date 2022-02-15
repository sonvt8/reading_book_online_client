import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Story } from 'src/app/_models/story';
import { CategoryService } from 'src/app/_services/category.service';
import { StoryService } from 'src/app/_services/story.service';

@Component({
  selector: 'app-category-pagination',
  templateUrl: './category-pagination.component.html',
  styleUrls: ['./category-pagination.component.css']
})
export class CategoryPaginationComponent implements OnInit {

  listTopViewWeek: Story[] = [];
  listTopAppointMonth: Story[] = [];
  pageStory: Story[] = [];
  cid: string = "";
  totalPages: number = 0;
  currentPage: number = 1;
  page : number[] = [];
  categoryName: string = "";

  private subscriptions: Subscription[] = [];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private storyService: StoryService,
    private categoryService: CategoryService,
    private route: ActivatedRoute, 
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
        this.getStoryListByCategory(1);
        this.getCategoryName();
    });
  }

  getCategoryName(): void {
    this.cid = this.route.snapshot.params['cid'];
    this.categoryService.getCategory(Number(this.cid)).subscribe(data => this.categoryName = data.name);
  }

  getStoryListByCategory(pagenumber: number){

    this.cid = this.route.snapshot.params['cid'];
    this.subscriptions.push(this.storyService.getStoryListByCategory(pagenumber, this.cid)
        .subscribe(data => {
          this.pageStory = data.pageStory.content;
          this.listTopViewWeek = data.listTopViewWeek;
          this.listTopAppointMonth = data.listTopAppointMonth;
          this.currentPage = data.pageStory.number + 1;
          this.totalPages = data.pageStory.totalPages;
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
