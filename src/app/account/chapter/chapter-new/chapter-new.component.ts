import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { Chapter } from 'src/app/_models/chapter';
import { Story } from 'src/app/_models/story';
import { ChapterService } from 'src/app/_services/chapter.service';
import { DataService } from 'src/app/_services/data.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { StoryService } from 'src/app/_services/story.service';


@Component({
  selector: 'app-chapter-new',
  templateUrl: './chapter-new.component.html',
  styleUrls: ['./chapter-new.component.css']
})
export class ChapterNewComponent implements OnInit {
  public loading = false;
  public submitted = false;
  private subscriptions: Subscription[] = [];
  public storyId: number = 0;
  public story: Story = new Story();
  public chapterForm!: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private chapterService: ChapterService,
    private storyService: StoryService,
    private notifyService: NotificationService,
    private formBuilder: FormBuilder,
    private dataService: DataService
  ) { }

  ngOnInit(): void { 
    this.storyId = +this.route.snapshot.params['sid'];
    this.subscriptions.push(this.storyService.getStoryById(this.storyId).subscribe(
      response => {
          this.story = response.storySummary;
      }, error => this.notifyService.notify(NotificationType.ERROR,error.error.message)
    ));
    this.chapterForm = this.formBuilder.group({
      serial: ['', [Validators.required,Validators.maxLength(5)]],
      chapterNumber: ['', [Validators.required,Validators.maxLength(5)]],
      name: ['', [Validators.required,Validators.maxLength(255)]],
      content: ['', Validators.required]
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  // convenience getter for easy access to form fields
  get f() { return this.chapterForm.controls; }

  onSubmit() {
    this.submitted = true;
    
    // stop here if form is invalid
    if (this.chapterForm.invalid) {
      return;
    }
    this.chapterForm.disable()
    this.loading = true;

    this.subscriptions.push(
      this.chapterService.addChapter( this.storyId, this.chapterForm.value).subscribe(
        (response: Chapter) => {
          this.notifyService.notify(NotificationType.SUCCESS,"Chương truyện đã đăng thành công");
          this.chapterForm.reset();
          this.router.navigate(['/tai_khoan/chuong_cua_truyen/' + response.story.id]);
          this.loading = false;
        },error => {
          this.loading = false;
        },
        () => {
          this.submitted = false;
          this.chapterForm.reset();
        }
      )
    );
  }

  formReset(){
    this.chapterForm.reset();
  }
}

interface ChapterInfo {
  chapter: Chapter,
  preChapter: number;
  nextChapter: number;
  checkVip: boolean;
}
