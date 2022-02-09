import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Category } from '../_models/category';
import { Information } from '../_models/information';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  info!: Information;
  categories!: Category[];

  constructor(
    private router: Router,
    private dataService: DataService,
    private titleService: Title
  ) { }

  ngOnInit(): void {
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
