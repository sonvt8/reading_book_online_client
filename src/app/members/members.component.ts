import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { User } from '../_models/user';
import { HeaderType } from '../enum/header-type.enum';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit, OnDestroy {
  public loading = false;
  public submitted = false;
  public loginForm!: FormGroup;
  private subscriptions: Subscription[] = [];
  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenStorageService
  ) { }

  ngOnInit(): void {
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
        }
      )
    );
  }
}

interface UserLogin {
  username: string;
  password: string;
}
