import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Story } from '../_models/story';
import { TopConvert } from '../_models/top-convert';
import { User } from '../_models/user';
import { StoryService } from '../_services/story.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  topStoryWeek: Story[] = [];
  listNewStory: Story[] = [];
  topStory: Story[] = [];
  topVipStory: Story[] = [];
  topConvert: TopConvert[] = [];
  private subscriptions: Subscription[] = [];
  noImage = 'https://res.cloudinary.com/thang1988/image/upload/v1544258290/truyenmvc/noImages.png';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private storyService: StoryService,
    private userService: UserService,  
    private router: Router, 
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(this.document.body, 'body-home');
    //this.renderer.addClass(this.document.body, 'page-login');
    this.getHomeStory();
    this.getTopConvert();
  }

  getHomeStory(){
    this.subscriptions.push(this.storyService.getHomeStory()
        .subscribe(data => {
          this.topStoryWeek = data.topStoryWeek;
          this.listNewStory = data.listNewStory;
          this.topStory = data.topStory;
          this.topVipStory = data.topVipStory;
        }
    ));
  }

  getTopConvert(){
    this.subscriptions.push(this.userService.getTopConvert()
        .subscribe(data => {
          this.topConvert = data;
        }
    ));
  }

}
