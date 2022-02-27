import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { Chapter } from 'src/app/_models/chapter';
import { Story } from 'src/app/_models/story';
import { ChapterService } from 'src/app/_services/chapter.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { StoryService } from 'src/app/_services/story.service';

declare var $: any;

@Component({
  selector: 'app-chapter-edit',
  templateUrl: './chapter-edit.component.html',
  styleUrls: ['./chapter-edit.component.css']
})
export class ChapterEditComponent implements OnInit, OnDestroy {
  public loading = false;
  public submitted = false;
  public chapterId: number = 0;
  public storyId: number = 0;
  public chapterStatus: number = 1;
  private subscriptions: Subscription[] = [];
  public editChapterForm!: FormGroup;
  public chapter: Chapter = new Chapter();
  public story: Story = new Story();

  public statusList = [
    {'id': 0, 'label': 'Khoá'},
    {'id': 1, 'label': 'Miễn Phí'},
    {'id': 2, 'label': 'VIP'}
  ];
  public status = this.statusList[0];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private chapterService: ChapterService,
    private notifyService: NotificationService,
    private storyService: StoryService,
    private fb: FormBuilder,
  ) {
    this.editChapterForm = this.fb.group({
      serial: ['', [Validators.required,Validators.maxLength(5)]],
      chapterNumber: ['', [Validators.required,Validators.maxLength(5)]],
      name: ['', [Validators.required,Validators.maxLength(255)]],
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.showSelect();
    this.chapterId = +this.route.snapshot.params['cid'];
    this.storyId = +this.route.snapshot.params['sid'];
    this.loadDataForm(this.storyId,this.chapterId);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  onSubmit(){
    this.submitted = true;
    
    // stop here if form is invalid
    if (this.editChapterForm.invalid) {
      return;
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.editChapterForm.controls; }

  loadDataForm(sid: number,cid: number){
    this.subscriptions.push(this.chapterService.getChapterByStoryIdAndChapterId(sid, cid)
        .subscribe(data => {
          this.chapter = data.chapter;
          this.story = data.chapter.story;
          console.log(this.chapter)
          this.editChapterForm.setValue({
            serial: this.chapter.serial, 
            chapterNumber: this.chapter.chapterNumber,
            name: this.chapter.name,
            content: this.chapter.content
          });
        }, error => this.notifyService.notify(NotificationType.ERROR,error.error.message)
    ));
  }

  valueChange(event: any) {
    const target = event.target.value;
    const strArr = target.split(":");
    this.chapterStatus = parseInt(strArr[0]);
  }

  formReset(){
    this.editChapterForm.reset();
  }

  showSelect(){
    $(document).ready(function () {
      $('.mdb-select').materialSelect();
    });
  }
}
