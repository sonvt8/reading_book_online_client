import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';

declare const showNavbar: any


@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})

export class AdminNavbarComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.renderer.addClass(this.document.body, 'fixed-sn');
    this.renderer.addClass(this.document.body, 'white-skin');
    this.renderer.addClass(this.document.body, 'body-none');
    showNavbar();
  }
  

}
