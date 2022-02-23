import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { Story } from 'src/app/_models/story';
import { ChapterService } from 'src/app/_services/chapter.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { StoryService } from 'src/app/_services/story.service';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css']
})
export class ChapterComponent implements OnInit, OnDestroy {
  public loading = false;
  public submitted = false;
  private subscriptions: Subscription[] = [];
  public storyId: number = 3;
  public story: Story = new Story();
  public chapterForm!: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private chapterService: ChapterService,
    private storyService: StoryService,
    private notifyService: NotificationService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void { 
    this.storyId = +this.route.snapshot.params['sid'];
    this.subscriptions.push(this.storyService.getStoryById(this.storyId).subscribe(
      response => {
          this.story = response.storySummary;
          console.log(this.story)
          console.log(this.story.id)
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
  }
}
