import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.renderer.removeAttribute(this.document.body, 'class');
    this.renderer.addClass(this.document.body, 'style-3');
    var eTitle = document.getElementsByClassName("error-title-block");
    eTitle[0].classList.add("animated");
    eTitle[0].classList.add("flipInY");

    var eCon = document.getElementsByClassName("error-container");
    eCon[0].classList.add("animated");
    eCon[0].classList.add("fadeInUp");
  }

}
