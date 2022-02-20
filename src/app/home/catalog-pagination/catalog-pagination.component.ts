import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Story } from 'src/app/_models/story';
import { StoryService } from 'src/app/_services/story.service';
import SwiperCore, {Navigation, Pagination, SwiperOptions} from 'swiper';

SwiperCore.use([Navigation, Pagination]);

@Component({
  selector: 'app-catalog-pagination',
  templateUrl: './catalog-pagination.component.html',
  styleUrls: ['./catalog-pagination.component.css']
})
export class CatalogPaginationComponent implements OnInit, OnDestroy {

  listStoryPage: Story[] = [];
  topStoryMonth: Story[] = [];
  page : number[] = [];
  private subscriptions: Subscription[] = [];
  totalPages: number = 0;
  currentPage: number = 1;
  catalog: string = "";

  constructor(
    private storyService: StoryService, 
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
        this.getStoryListByCatalog(1);
    });
  }

  getStoryListByCatalog(pagenumber: number){
    if (pagenumber === undefined) {
      pagenumber = 1;
    }
    this.catalog = this.route.snapshot.params['catalog'];
    this.subscriptions.push(this.storyService.getStoryListByCatalog(pagenumber, this.catalog)
        .subscribe(data => {
          this.listStoryPage = data.listStoryPage.content;
          this.topStoryMonth = data.topStoryMonth;
          this.currentPage = data.listStoryPage.number + 1;
          this.totalPages = data.listStoryPage.totalPages;
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

  config: SwiperOptions = {
    navigation: true,
    pagination: {
      clickable: true
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
