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

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public info!: Information;
  public categories!: Category[];
  public currentUser: User = new User;
  subscription: Subscription;
  private loggedInUsername!: string;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
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
    this.renderer.addClass(this.document.body, 'body-home');
    this.renderer.addClass(this.document.body, 'page-login');
    this.getDataHeader();
    // this.currentUser = this.authService.userValue as User;
  }

  getDataHeader(){
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
}
