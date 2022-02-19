import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/_models/category';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';
import { CategoryService } from 'src/app/_services/category.service';

declare var $: any;
declare var showImage : any;

@Component({
  selector: 'app-story-submit',
  templateUrl: './story-submit.component.html',
  styleUrls: ['./story-submit.component.css']
})
export class StorySubmitComponent implements OnInit, OnDestroy {
  public loading = false;
  public submitted = false;
  public images!: File ;
  private subscriptions: Subscription[] = [];
  public categories: Category[] = [];
  public isTextAreaEmpty: boolean = true;
  public addStoryForm!: FormGroup;
  public currentUser: User = new User;
  public isAdminOrConverter: boolean = false;
  
  
  constructor(
    private cateService: CategoryService,
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
    this.addStoryForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      enterInformation: ['', Validators.required],
      checkArray: this.fb.array([], [Validators.required])
    })
  }

  ngOnInit(): void {
    showImage();
    this.subscriptions.push(
      this.cateService.getCategories().subscribe(
        (response: Category[]) => {
          this.categories = response;
        }
      )
    );
    this.subscriptions.push(
      this.authService.user.subscribe(user => {
        this.currentUser = user as User;
        this.isAdminOrConverter = this.currentUser.roleList.every(role => role.id === 1 || 3);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  // convenience getter for easy access to form fields
  get f() { return this.addStoryForm.controls; }

  onCheckboxChange(e: any) {
    const checkArray: FormArray = this.addStoryForm.get('checkArray') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  onImageUpload(event: any): void {
    this.images = event.target.files[0];
    console.log(this.images);
  }

  onSubmit() {
    this.submitted = true;
    
    // stop here if form is invalid
    if (this.addStoryForm.invalid) {
      return;
    }

    // this.loading = true;
    // var loginUser: UserLogin = {
    //   title: this.loginForm.get('username')!.value,
    //   password:this.loginForm.get('password')!.value
    // };

    // this.subscriptions.push(
    //   this.authService.login(loginUser).subscribe(
    //     (response: HttpResponse<User>) => {
    //       const token = response.headers.get(HeaderType.JWT_TOKEN);
    //       this.tokenService.saveToken(token!);
    //       this.authService.addUserToLocalCache(response.body!);
    //       this.authService.setCurrentUser(response.body!);
    //       this.router.navigate(['/trang-chu']);
    //       this.loading = false;
    //     },error => {
    //       this.loading = false;
    //     })
    // );
  }

}
