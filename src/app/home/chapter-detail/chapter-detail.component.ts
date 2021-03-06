import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Chapter } from 'src/app/_models/chapter';
import { CommentModel } from 'src/app/_models/comment-model';
import { AuthService } from 'src/app/_services/auth.service';
import { ChapterService } from 'src/app/_services/chapter.service';
import { CommentService } from 'src/app/_services/comment.service';
import { StoryService } from 'src/app/_services/story.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chapter-detail',
  templateUrl: './chapter-detail.component.html',
  styleUrls: ['./chapter-detail.component.css']
})
export class ChapterDetailComponent implements OnInit, OnDestroy {

  currentDay = new Date();
  numberDay: number = 0;
  chapter: Chapter = new Chapter();
  preChapter: number = 0;
  nextChapter: number = 0;
  checkVip: boolean = false;
  isLoggedIn: boolean = false;
  sid: number = 0;
  chid: number = 0;
  totalComment: number = 0;
  listComment: CommentModel[] = [];
  totalPages: number = 0;
  currentPage: number = 1;
  page: number[] = [];
  noImage = 'https://res.cloudinary.com/thang1988/image/upload/v1544258290/truyenmvc/noImages.png';

  private subscriptions: Subscription[] = [];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private storyService: StoryService,
    private chapterService: ChapterService,
    private route: ActivatedRoute,
    private router: Router ,
    private authService: AuthService,
    private commentService: CommentService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.renderer.removeAttribute(this.document.body, 'class');
    this.renderer.addClass(this.document.body, 'body-home');
    this.renderer.addClass(this.document.body, 'page-read');
    this.route.paramMap.subscribe(() => {
    this.sid = this.route.snapshot.params['sid'];
    this.chid = this.route.snapshot.params['chid'];
    this.getCommentList(1, 1);
      if(this.isLoggedIn){
        this.getAccountChapterByStoryIdAndChapterId();
      } else {
        this.getChapterByStoryIdAndChapterId();
      }
    });
  }

  getAccountChapterByStoryIdAndChapterId(){
    this.subscriptions.push(this.chapterService.getAccountChapterByStoryIdAndChapterId(this.sid, this.chid)
        .subscribe(data => {
          this.chapter = data.chapter;
          this.preChapter = data.preChapter;
          this.nextChapter = data.nextChapter;
          this.checkVip = data.checkVip;
          this.numberDay = this.getDaysBetweenTwoDay(this.currentDay, new Date(this.chapter.dealine));
        }
    ));
  }

  getChapterByStoryIdAndChapterId(){
    this.subscriptions.push(this.chapterService.getChapterByStoryIdAndChapterId(this.sid, this.chid)
        .subscribe(data => {
          this.chapter = data.chapter;
          this.preChapter = data.preChapter;
          this.nextChapter = data.nextChapter;
          this.checkVip = data.checkVip;
          this.numberDay = this.getDaysBetweenTwoDay(this.currentDay, new Date(this.chapter.dealine));
        }
    ));
  }

  getCommentList(pagenumber: number, type: number){
    this.sid = +this.route.snapshot.params['sid'];
    if (pagenumber === undefined) {
      pagenumber = 1;
    }
    if (type === undefined) {
        type = 1;
    }
    
    var form = new FormData();
    form.append("storyId", JSON.stringify(this.sid));
    form.append("pagenumber", JSON.stringify(pagenumber));
    form.append("type", JSON.stringify(type));
    this.commentService.getCommentList(form).subscribe(data =>{
      this.listComment = data.content;
      this.currentPage = data.number + 1;
      this.totalComment = data.totalElements;
      this.totalPages = data.totalPages;
      var startPage = Math.max(1, this.currentPage - 2);
      var endPage = Math.min(startPage + 4, this.totalPages);
      var pages = [];
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      this.page = pages;
    })
  }

  addComment(newForm: NgForm){
    if(newForm.value.commentText.trim() != ""){
      this.sid = +this.route.snapshot.params['sid'];
      var form = new FormData();
      form.append("storyId", JSON.stringify(this.sid));
      form.append("commentText", newForm.value.commentText);
      this.subscriptions.push(this.commentService.addComment(form).subscribe(
        response => {
          newForm.reset();
          this.getCommentList(1,1);
          Swal.fire({
            text: "B??nh lu???n th??nh c??ng!",
            icon: 'success',
            confirmButtonText: 'Ok'
          })
        }, error => this.toastr.error(error.error.message)
    ));
    } else {
      Swal.fire({
        text: "B???n c???n nh???p th??ng tin",
        icon: 'warning',
        confirmButtonText: 'Ok'
      })
    }
    
  }

  chapterVip(id: number){
      var form = new FormData();
      form.append("chapterId", JSON.stringify(id));
      this.subscriptions.push(this.chapterService.buyChaperVip(form).subscribe(
        response => {
          
          Swal.fire({
            text: "Mua ch????ng vip th??nh c??ng",
            icon: 'success',
            confirmButtonText: 'Ok'
          })
          this.checkVip= true;
          this.router.navigateByUrl(`/truyen-home/${this.sid}/${id}`, { skipLocationChange: true }).then(r => {});
        }, error => this.toastr.error(error.error.message)
    ));
  }

  getDaysBetweenTwoDay(d1: Date, d2: Date){
    let ms1 = d1.getTime();
    let ms2 = d2.getTime();
    return Math.ceil((ms2 - ms1) / (24*60*60*1000));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
