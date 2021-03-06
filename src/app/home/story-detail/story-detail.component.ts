import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Chapter } from 'src/app/_models/chapter';
import { Story } from 'src/app/_models/story';
import { User } from 'src/app/_models/user';
import { CommentModel } from 'src/app/_models/comment-model';
import { TopConvert } from 'src/app/_models/top-convert';
import { AuthService } from 'src/app/_services/auth.service';
import { ChapterService } from 'src/app/_services/chapter.service';
import { FollowService } from 'src/app/_services/follow.service';
import { StoryService } from 'src/app/_services/story.service';
import { UserService } from 'src/app/_services/user.service';

import SwiperCore, { Navigation, SwiperOptions } from 'swiper';
import { CommentService } from 'src/app/_services/comment.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { RatingService } from 'src/app/_services/rating.service';
import { AccountService } from 'src/app/_services/account.service';
SwiperCore.use([Navigation]);


@Component({
  selector: 'app-story-detail',
  templateUrl: './story-detail.component.html',
  styleUrls: ['./story-detail.component.css']
})
export class StoryDetailComponent implements OnInit, OnDestroy {

  story: Story = new Story();
  listChapter: Chapter[] = [];
  listStory: Story[] = [];
  sid: number = 0;
  totalPages: number = 0;
  totalPagesComment: number = 0
  currentPage: number = 1;
  page: number[] = [];
  readChapter!: Chapter;
  checkConverter: boolean = false;
  rating: boolean = false;
  countRating: number = 0;
  follow: boolean = false;
  user: User = new User();
  currentUser: User = new User();
  totalComment: number = 0;
  listComment: CommentModel[] = [];
  noImage = 'https://res.cloudinary.com/thang1988/image/upload/v1544258290/truyenmvc/noImages.png';
  isLoggedIn: boolean = false;
  starRating = 0;

  private subscriptions: Subscription[] = [];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private storyService: StoryService,
    private chapterService: ChapterService,
    private userService: UserService,
    private followService: FollowService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private commentService: CommentService,
    private toastr: ToastrService,
    private ratingService: RatingService,
    private accService: AccountService,
    config: NgbRatingConfig
  ) {config.max = 5; }
    

  ngOnInit(): void {    
    this.currentUser = this.authService.getUserFromLocalCache();
    this.isLoggedIn = this.authService.isLoggedIn();
    this.renderer.removeAttribute(this.document.body, 'class');
    this.renderer.addClass(this.document.body, 'body-home');
    this.route.paramMap.subscribe(() => {
      this.sid = +this.route.snapshot.params['sid'];
      this.getChapterListByStoryId(1, 1);
      this.getStoryById();
      if (this.isLoggedIn) {
        this.checkFollow();
        this.checkGetStoryById();
      }
    });
  }

  checkFollow() {
    var form = new FormData();
    form.append("storyId", JSON.stringify(this.sid));
    this.followService.checkFollow(form).subscribe(data => this.follow = data);
  }

  appoint(newForm: NgForm){
    //console.log(newForm.value);
    if(newForm.value.coupon != ""){
     
      var form = new FormData();
      form.append("storyId", JSON.stringify(this.sid));
      form.append("coupon", newForm.value.coupon);
      this.subscriptions.push(this.storyService.appointStory(form).subscribe(
        response => {
          newForm.reset();
          Swal.fire({
            text: "????? c??? th??nh c??ng!",
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

  getStoryById(): void {
    this.storyService.getStoryById(this.sid).subscribe(data => {
      this.story = data.storySummary;
      this.countRating = data.countRating;
      var form = new FormData();
      form.append("userId", JSON.stringify(data.storySummary.userId));
      this.getCommentList(1, 1);
      this.userService.getConvertInfo(form).subscribe(data => this.user = data);
      this.storyService.getStoryByUser(data.storySummary.userId).subscribe(data => this.listStory = data);
    });

  }

  checkGetStoryById(): void {
    this.accService.checkGetStoryById(this.sid).subscribe(data => {
      this.readChapter = data.readChapter;
      this.checkConverter = data.checkConverter;
      this.rating = data.rating;
    });
  }

  getChapterListByStoryId(pagenumber: number, type: number) {
    this.subscriptions.push(this.chapterService.getChapterListOfStory(this.sid, pagenumber, type)
      .subscribe(data => {
        this.listChapter = data.content;
        this.currentPage = data.number + 1;
        this.totalPages = data.totalPages;
        var startPage = Math.max(1, this.currentPage - 2);
        var endPage = Math.min(startPage + 4, this.totalPages);
        var pages = [];
        for (let i = startPage; i <= endPage; i++) {
          pages.push(i);
        }
        this.page = pages;
      }
      ));
  }

  getCommentList(pagenumber: number, type: number){
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
      this.totalPagesComment = data.totalPages;
      var startPage = Math.max(1, this.currentPage - 2);
      var endPage = Math.min(startPage + 4, this.totalPagesComment);
      var pages = [];
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      this.page = pages;
    })
  }


  ratingHover(event: any){
    this.starRating = event;
  }

  submitRating(){
    var form = new FormData();
    form.append("idBox", JSON.stringify(this.sid));
    form.append("rate", JSON.stringify(this.starRating));
    this.ratingService.ratingStory(form).subscribe(data =>  {
      this.getStoryById();
      this.rating = true;
      Swal.fire({
        text: "????nh gi?? th??nh c??ng!",
        icon: 'success',
        confirmButtonText: 'Ok'
      })
    }, error => this.toastr.error(error.error.message)
    );
  }

  addFollowStory(){
    var form = new FormData();
    form.append("storyId", JSON.stringify(this.sid));
    this.followService.addFollowStory(form).subscribe(data =>  {
      this.getStoryById();
      this.follow = true;
      Swal.fire({
        text: "Theo d??i truy???n th??nh c??ng!",
        icon: 'success',
        confirmButtonText: 'Ok'
      })
    }, error => this.toastr.error(error.error.message)
    );
  }

  cancelFollowStory(){
    var form = new FormData();
    form.append("storyId", JSON.stringify(this.sid));
    this.followService.cancelFollowStory(form).subscribe(data =>  {
      this.getStoryById();
      this.follow = false;
      Swal.fire({
        text: "H???y theo d??i truy???n th??nh c??ng!",
        icon: 'success',
        confirmButtonText: 'Ok'
      })
    }, error => this.toastr.error(error.error.message)
    );
  }

  addComment(newForm: NgForm){
    if(newForm.value.commentText.trim() != ""){
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

  config: SwiperOptions = {
    navigation: true
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
