import { Component, OnInit } from '@angular/core';

declare var $: any;
declare var Ps: any;


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
    $(".button-collapse").sideNav();
    var container = document.querySelector('.custom-scrollbar');
    Ps.initialize(container, {
        wheelSpeed: 2,
        wheelPropagation: true,
        minScrollbarLength: 20
    });

    // Tooltips Initialization
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
  }

}
