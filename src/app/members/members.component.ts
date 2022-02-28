import { Component, OnInit, OnDestroy, Inject, Renderer2 } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  public loading = false;
  public submitted = false;
  public loginForm!: FormGroup;
  public cvId: number = 0;
  
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.renderer.removeAttribute(this.document.body, 'class');
    this.renderer.addClass(this.document.body, 'page-read');
    this.renderer.addClass(this.document.body, 'body-home');
    this.cvId = +this.route.snapshot.params['tcid'];
    console.log(this.cvId);
  }
}