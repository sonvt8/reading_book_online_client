import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Category } from '../_models/category';
import { Information } from '../_models/information';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', '../../assets/css/myWebStyle.css']
})
export class HeaderComponent implements OnInit {
  info!: Information;
  categories!: Category[];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private router: Router,
    private dataService: DataService,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(this.document.body, 'body-home');
    this.renderer.addClass(this.document.body, 'page-login');
    this.getDataHeader();
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
}
