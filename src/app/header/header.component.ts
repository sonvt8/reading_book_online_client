import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Category } from '../_models/category';
import { Information } from '../_models/information';
import { DataService } from '../_services/data.service';
import { AuthService } from '../_services/auth.service';
import { User } from '../_models/user';
import { Subscription } from 'rxjs';


declare var searchStory: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', '../../assets/css/myWebStyle.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public info!: Information;
  public categories!: Category[];
  public currentUser: User = new User;
  subscription: Subscription;
  private loggedInUsername!: string;

  constructor(
    private router: Router,
    private dataService: DataService,
    private authService: AuthService,
    private titleService: Title,
  ) {
    this.subscription = this.authService.user.subscribe(user => {
      this.currentUser = user as User;
      this.loggedInUsername = user?.username as string;
    });
  }

  ngOnInit(): void {
    searchStory();
    this.getDataHeader();
    this.loadJsFile("../../assets/static/js/myApp.js");
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getDataHeader() {
    this.dataService.getData().subscribe(res => {
      this.info = res.information;
      this.categories = res.listCategoryOfMenu;
    });
  }

  setDocTitle(title: string) {
    this.titleService.setTitle(title);
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['/trang-chu']);
  }

  public loadJsFile(url: string) {
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);
  }
}
