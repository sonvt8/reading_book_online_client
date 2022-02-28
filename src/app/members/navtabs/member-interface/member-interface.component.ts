import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Story } from 'src/app/_models/story';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-member-interface',
  templateUrl: './member-interface.component.html',
  styleUrls: ['./member-interface.component.css']
})
export class MemberInterfaceComponent implements OnInit, OnDestroy {
  @Input() cvId: number = 0;

  private subscriptions: Subscription[] = [];
  public user: User = new User();
  public countStory:number = 0;
  public countChapter:number = 0;

  public lstStory: Story[] = [];
  public totalPages: number = 0;
  public currentPage: number = 1;
  public pages : number[] = [];
  
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    const form = new FormData();
    form.append("userId", JSON.stringify(this.cvId));
    this.subscriptions.push(this.userService.getConvertInfo(form).subscribe(
      data => {
        this.user = data;
        this.countChapter = data.countChapter;
        this.countStory = data.countStory;
      }
    ));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}


