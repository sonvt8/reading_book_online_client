import { Component, OnInit } from '@angular/core';

declare var $: any;


@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})

export class AdminNavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.showNavbar();
  }

  showNavbar(){
    $(".button-collapse").click(function(){
      $(".side-nav").css("transform","translateX(0%)");
    });
  }

}
