import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { CustomHttpResponse } from 'src/app/_models/custom-http-response';
import { AccountService } from 'src/app/_services/account.service';
import { AuthService } from 'src/app/_services/auth.service';
import { CustomValidationService } from 'src/app/_services/custom-validation.service';
import { NotificationService } from 'src/app/_services/notification.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit, OnDestroy {
  public passChangedForm!: FormGroup;
  public loading = false;
  public submitted = false;
  private subscriptions: Subscription[] = [];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private formBuilder: FormBuilder,
    private customValidator: CustomValidationService,
    private accService: AccountService,
    private notifyService: NotificationService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.renderer.removeAttribute(this.document.body, 'class');
    this.passChangedForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
      confirmNewPassword: ['', Validators.required]
    }, {
      validator: this.customValidator.MatchPassword('newPassword', 'confirmNewPassword'),
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  // convenience getter for easy access to form fields
  get f() { return this.passChangedForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.passChangedForm.invalid) {
      return;
    }
    this.passChangedForm.disable()
    this.loading = true;
    const oldPasword = this.passChangedForm.get('oldPassword')!.value;
    const newPasword = this.passChangedForm.get('newPassword')!.value;

    this.subscriptions.push(
      this.accService.updatePassword(oldPasword,newPasword).subscribe(
        (response: CustomHttpResponse) => {
          this.notifyService.notify(NotificationType.SUCCESS,response.message);
          this.loading = false;
          this.authService.logOut();
          this.router.navigate(['/trang-chu']);
        },error => {
          this.loading = false;
        },
        () => {
          this.submitted = false;
          this.passChangedForm.reset();
        })
    );
  }
}

