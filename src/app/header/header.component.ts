import { Component, OnInit } from '@angular/core';
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
  cate!: Category[];

  constructor(
    private router: Router,
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    this.getDataHeader();
  }

  getDataHeader(){
    this.dataService.getData().subscribe(res => {
      console.log(res);
      console.log(res.information.logo);
    });
  }
}
