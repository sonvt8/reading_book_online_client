import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { Chapter } from 'src/app/_models/chapter';
import { Story } from 'src/app/_models/story';
import { AccountService } from 'src/app/_services/account.service';
import { ChapterService } from 'src/app/_services/chapter.service';
import { NotificationService } from 'src/app/_services/notification.service';
import Swal from 'sweetalert2';

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
    private accService: AccountService,
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

    this.editChapterForm.disable()
    this.loading = true;

    if(this.chapterStatus == 0){
      Swal.fire({
        title: 'Tài khoản thực hiện khoá truyện đăng?',
        text: 'Bạn sẽ không thể khôi phục trạng thái của truyện sau khi khoá',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Đồng Ý',
        cancelButtonText: 'Hủy'
      }).then((result) => {
        if (result.value) {
          this.chapterOnSubmited()
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.editChapterForm.enable();
          this.loading = false;
          return;
        }
      })
    }else{
      this.chapterOnSubmited()
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.editChapterForm.controls; }

  chapterOnSubmited(){
    this.chapter.serial = this.editChapterForm.get('serial')!.value;
    this.chapter.chapterNumber = this.editChapterForm.get('chapterNumber')!.value;
    this.chapter.name = this.editChapterForm.get('name')!.value;
    this.chapter.content = this.editChapterForm.get('content')!.value;
    this.chapter.status = this.chapterStatus;

    this.subscriptions.push(
      this.accService.updateChapter(this.chapter,this.chapterId).subscribe(
        (response: Story) => {
          this.notifyService.notify(NotificationType.SUCCESS,"Chương truyện đã được sửa nội dung");
          this.editChapterForm.reset();
          this.loading = false;
          // this.dataService.updateStatus(7);
          this.router.navigate(['/tai_khoan/chuong_cua_truyen/'+ this.storyId]);
        },error => {
          this.loading = false;
        },
        () => {
          this.submitted = false;
          this.editChapterForm.enable();
        }
      )
    );
  }

  loadDataForm(sid: number,cid: number){
    this.subscriptions.push(this.chapterService.getChapterByStoryIdAndChapterId(sid, cid)
        .subscribe(data => {
          this.chapter = data.chapter;
          this.story = data.chapter.story;
          this.chapterStatus = this.chapter.status;
          // handle string return
          const search = '<br />';
          const replaceWith = '';
          const result = this.chapter.content.split(search).join(replaceWith)
          this.editChapterForm.setValue({
            serial: this.chapter.serial, 
            chapterNumber: this.chapter.chapterNumber,
            name: this.chapter.name,
            content:result
          });
        }, error => this.notifyService.notify(NotificationType.ERROR,error.error.message)
    ));
  }

  valueChange(event: any) {
    const obj = this.statusList!.find(element => element.label === event.target.value);
    this.chapterStatus = obj!.id;
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
