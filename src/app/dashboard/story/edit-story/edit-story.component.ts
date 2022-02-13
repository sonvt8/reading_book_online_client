import { Component, OnInit } from '@angular/core';
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
export class EditStoryComponent implements OnInit {

  private subscriptions: Subscription[] = [];
  story: Story = new Story();
  currentId: number = 0;
  profileImage!: File ;

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
    private route: ActivatedRoute) { }

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
    this.storyService.getAdminStory(this.currentId).subscribe(data => {
      this.story = data;
    }
    );
    
  }

  submitEditAdminStory(editForm: NgForm): void {
    const formData = this.storyService.createStoryFormData(this.story, this.profileImage);
    this.subscriptions.push(this.storyService.updateAdminStory(formData, this.story.id).subscribe(
        response => {
            this.router.navigateByUrl('/quan-tri/truyen').then(r => {});
            editForm.reset();
            this.toastr.success(`truyện ${response.name} cập nhật thành công!`);
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
  

  showSelect(){
    $(document).ready(function () {
      $('.mdb-select').materialSelect();
    });
    
  }

}
