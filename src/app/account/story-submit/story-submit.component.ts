import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { Category } from 'src/app/_models/category';
import { Story } from 'src/app/_models/story';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { AuthService } from 'src/app/_services/auth.service';
import { CategoryService } from 'src/app/_services/category.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { StoryService } from 'src/app/_services/story.service';

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
  public fileToUpload!: File ;
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
    private storyService: StoryService,
    private notifyService: NotificationService,
    private accService: AccountService
  ) {
    this.addStoryForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      enterInformation: ['', Validators.required],
      checkArray: this.fb.array([], [Validators.required]),
      imageInput: ['', Validators.required],
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
    this.fileToUpload = event.target.files[0];
    console.log(this.fileToUpload);
  }

  onSubmit() {
    this.submitted = true;
    
    // stop here if form is invalid
    if (this.addStoryForm.invalid) {
      return;
    }
    this.addStoryForm.disable()
    this.loading = true;

    var formData: any = new FormData();
    formData.append("name", this.addStoryForm.get('title')!.value);
    formData.append("author", this.addStoryForm.get('author')!.value);
    formData.append("infomation", this.addStoryForm.get('enterInformation')!.value);
    formData.append("category", this.addStoryForm.get('checkArray')!.value);
    formData.append("image", this.fileToUpload);

    this.subscriptions.push(
      this.accService.addStory(formData).subscribe(
        (response: Story) => {
          this.notifyService.notify(NotificationType.SUCCESS,"Bạn đã đăng truyện thành công");
          this.loading = false;
        },error => {
          this.loading = false;
        },
        () => {
          this.submitted = false;
          this.addStoryForm.reset();
        }
      )
    );
  }
}

