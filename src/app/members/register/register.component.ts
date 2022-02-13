import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidationService } from '../../_services/custom-validation.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;
  submitted = false;
  
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.renderer.removeAttribute(this.document.body, 'class');
    this.renderer.addClass(this.document.body, 'body-home');
    this.renderer.addClass(this.document.body, 'page-login');
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.registerForm.disable()
    this.loading = true;

    var user: UserRegister = {
      username: this.registerForm.get('username')!.value,
      email: this.registerForm.get('email')!.value
    };

    this.authService.register(user).subscribe(response => {
      this.toastr.success('Thông tin đăng ký đã gửi đến email của bạn');
      this.router.navigate(['../dang-nhap'], { relativeTo: this.route });
    },error => {
      this.loading = false;
    })
  }
}

interface UserRegister {
  username: string;
  email: string;
}
