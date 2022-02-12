import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

declare var showNavbar: any

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})

export class AdminNavbarComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT) private document: Document, 
    private renderer: Renderer2,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(this.document.body, 'fixed-sn');
    this.renderer.addClass(this.document.body, 'white-skin');
    this.renderer.addClass(this.document.body, 'body-none');
    showNavbar();
  }
  
  logOut() {
    this.authService.logOut();
    this.router.navigate(['/trang-chu']);
  }

}
