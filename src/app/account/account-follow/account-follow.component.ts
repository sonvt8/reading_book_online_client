import { Component, OnInit } from '@angular/core';
import { Story } from 'src/app/_models/story';

@Component({
  selector: 'app-account-follow',
  templateUrl: './account-follow.component.html',
  styleUrls: ['./account-follow.component.css']
})
export class AccountFollowComponent implements OnInit {
  public listStory: Story[] = [];
  public totalPages: number = 0;
  public currentPage: number = 1;

  constructor() { }

  ngOnInit(): void {
  }

  deleteFollow(id: number, name: string){}

  getPage(page: number){}

}
