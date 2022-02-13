import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
  ) { }

  ngOnInit(): void {
    this.renderer.removeAttribute(this.document.body, 'class');
    this.renderer.addClass(this.document.body, 'body-home');
  }

}
