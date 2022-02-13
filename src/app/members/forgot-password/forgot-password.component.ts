import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';
import { CustomHttpResponse } from 'src/app/_models/custom-http-response';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  forgotForm!: FormGroup;
  loading = false;
  submitted = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.forgotForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  // convenience getter for easy access to form fields
  get f() { return this.forgotForm.controls; }

  onResetPassword() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.forgotForm.invalid) {
      return;
    }
    this.forgotForm.disable()
    this.loading = true;
    const emailAddress =  this.forgotForm.get('email')!.value;
    this.subscriptions.push(
      this.authService.resetPassword(emailAddress).subscribe(
        (response: CustomHttpResponse) => {
          this.toastr.success(response.message);
          this.router.navigate(['../dang-nhap'], { relativeTo: this.route });
          this.loading = false;
        },
        () => this.forgotForm.reset()
      )
    );
  }
}
