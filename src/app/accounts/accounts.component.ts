import { Component, OnInit, OnDestroy, Renderer2, Inject } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidationService } from '../_services/custom-validation.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { User } from '../_models/user';
import { HeaderType } from '../enum/header-type.enum';
import { TokenStorageService } from '../_services/token-storage.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit, OnDestroy {
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
    private customValidator: CustomValidationService,
    private toastr: ToastrService,
    private tokenService: TokenStorageService
  ) { }

  ngOnInit(): void {
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
          this.router.navigate(['../trang-chu'], { relativeTo: this.route });
          this.loading = false;
        }
      )
    );
  }
}

interface UserLogin {
  username: string;
  password: string;
}
