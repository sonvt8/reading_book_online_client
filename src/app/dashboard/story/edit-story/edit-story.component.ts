import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/_models/category';
import { Story } from 'src/app/_models/story';
import { CategoryService } from 'src/app/_services/category.service';
import { StoryService } from 'src/app/_services/story.service';

declare var $: any;
declare var showImage : any;

@Component({
  selector: 'app-edit-story',
  templateUrl: './edit-story.component.html',
  styleUrls: ['./edit-story.component.css']
})
export class EditStoryComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  story: Story = new Story();
  currentId: number = 0;
  images!: File ;
  username: string = "";
  categoryListInput: string[] = [];

  listCate: string[] = [];

  statusList = [
    {'id': 0, 'label': 'Khóa'},
    {'id': 1, 'label': 'Đang Ra'},
    {'id': 2, 'label': 'Tạm dừng'},
    {'id': 3, 'label': 'Hoàn Thành'},
  ];

  vipList = [
    {'id': 0, 'label': 'Miễn phí'},
    {'id': 1, 'label': 'Trả phí'},
  ];

  constructor(
    private storyService: StoryService, 
    private categoryService: CategoryService, 
    private router: Router, 
    private toastr: ToastrService, 
    private route: ActivatedRoute) { this.vipList = [
      {'id': 0, 'label': 'Miễn phí'},
      {'id': 1, 'label': 'Trả phí'},
    ];}

  ngOnInit(): void {
    showImage();
    this.showSelect();
    this.getcategoriesList();
    this.route.paramMap.subscribe(() => {
      this.handleStoryDetails();
      
    });
    
  }

  handleStoryDetails(): void {
    this.currentId = +this.route.snapshot.params['id'];
    this.subscriptions.push(this.storyService.getAdminStory(this.currentId).subscribe(
      response => {
          this.story = response;
          this.story.categoryListInput = response.categoryList.map(response => response.name);
          this.username = response.user.username;
      }, error => this.toastr.error(error.error.message)
  ));
    
  }

  submitEditAdminStory(editForm: NgForm): void {
    const formData = this.storyService.createStoryFormData(this.story, this.images);
    this.subscriptions.push(this.storyService.updateAdminStory(formData, this.story.id).subscribe(
        response => {
          if(editForm.value.dealStatus == 1){
            if(editForm.value.price == 0){
              this.toastr.error('Giá truyện vip phải lớn hơn 0');
            }
            else if(editForm.value.timeDeal == 0){
              this.toastr.error('Thời hạn vip phải lớn hơn 0');
            } else{
              this.router.navigateByUrl('/quan-tri/truyen').then(r => {});
              editForm.reset();
              this.toastr.success(`truyện ${response.name} cập nhật thành công!`);
            }
          } else {
            if(editForm.value.timeDeal !=0 || editForm.value.price !=0){
              this.toastr.error('Không được chỉnh giá hoặc thời gian vip khi truyện đang miễn phí');
            } else{
              this.router.navigateByUrl('/quan-tri/truyen').then(r => {});
              editForm.reset();
              this.toastr.success(`truyện ${response.name} cập nhật thành công!`);
            }
           
          }

        }, error => this.toastr.error(error.error.message)
    ));
  }

  getcategoriesList(){
    this.subscriptions.push(this.categoryService.getCategoryListNoPagination().subscribe(
      responses => {
        this.listCate = responses.map(response => response.name);
      }, error => this.toastr.error(error.error.message)
  ));
  }

  onProfileImageChange(event: any): void {
    this.images = event.target.files[0];
  }

  get isDealStatus() {
    return this.story.dealStatus == 1 ? 'Trả phí' : 'Miễn phí';
  }
 
  set isDealStatus(newValue:string) {
    if(newValue == 'Trả phí')
      this.story.dealStatus = 1;
    else
      this.story.dealStatus = 0;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  showSelect(){
    $(document).ready(function () {
      $('.mdb-select').materialSelect();
    });
    
  }

}
