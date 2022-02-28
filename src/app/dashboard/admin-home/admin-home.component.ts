import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { DataService } from 'src/app/_services/data.service';


@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  newStory: number = 0;
  newUser: number = 0;
  newChapter: number = 0;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getCountAdminHome();
  }

  getCountAdminHome(){
    this.dataService.getCountAdminHome().subscribe(
      data => {
        this.newUser = data.newUser;
        this.newStory = data.newStory;
        this.newChapter = data.newChapter;
      }
    )
  }

}
