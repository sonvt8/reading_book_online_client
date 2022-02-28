import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Story } from 'src/app/_models/story';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-member-stories',
  templateUrl: './member-stories.component.html',
  styleUrls: ['./member-stories.component.css']
})
export class MemberStoriesComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  @Input() cvId: number = 0;
  public listStory:Story[] = [];
  public totalPages: number = 0;
  public currentPage: number = 1;
  public pages : number[] = [];
  
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getListStory(1,1); //paginate list Stories
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  getListStory(pagenumber: number, type: number){
    this.subscriptions.push(this.userService.getStoriesConverter(this.cvId,pagenumber,type).subscribe(
      data => {
        this.listStory = data.content;
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
