import { DOCUMENT } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeaderType } from 'src/app/enum/header-type.enum';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loading = false;
  public submitted = false;
  public loginForm!: FormGroup;
  private subscriptions: Subscription[] = [];
  
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.renderer.removeAttribute(this.document.body, 'class');
    this.renderer.addClass(this.document.body, 'page-login');
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    var loginUser: UserLogin = {
      username: this.loginForm.get('username')!.value,
      password:this.loginForm.get('password')!.value
    };

    this.subscriptions.push(
      this.authService.login(loginUser).subscribe(
        (response: HttpResponse<User>) => {
          const token = response.headers.get(HeaderType.JWT_TOKEN);
          this.tokenService.saveToken(token!);
          this.authService.addUserToLocalCache(response.body!);
          this.authService.setCurrentUser(response.body!);
          this.router.navigate(['/trang-chu']);
          this.loading = false;
        },error => {
          this.loading = false;
        })
    );
  }

  removeElementsByClass(className: any){
    var elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode!.removeChild(elements[0]);
    }
}
}

interface UserLogin {
  username: string;
  password: string;
}
