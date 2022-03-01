import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { Category } from 'src/app/_models/category';
import { Story } from 'src/app/_models/story';
import { AccountService } from 'src/app/_services/account.service';
import { AuthService } from 'src/app/_services/auth.service';
import { CategoryService } from 'src/app/_services/category.service';
import { DataService } from 'src/app/_services/data.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { StoryService } from 'src/app/_services/story.service';
import Swal from 'sweetalert2';

declare var $: any;
declare var showImage : any;

@Component({
  selector: 'app-acc-edit-story',
  templateUrl: './acc-edit-story.component.html',
  styleUrls: ['./acc-edit-story.component.css']
})
export class AccEditStoryComponent implements OnInit, OnDestroy {
  public loading = false;
  public submitted = false;
  public storyId: number = 0;
  public images!: File ;
  private subscriptions: Subscription[] = [];
  public categories: Category[] = [];
  public editStoryForm!: FormGroup;
  public story: Story = new Story();
  public storyStatus: number = 1;
  public categoryList: FormArray = new FormArray([]);

  public statusList = [
    {'id': 0, 'label': 'Khóa'},
    {'id': 1, 'label': 'Đang Ra'},
    {'id': 2, 'label': 'Tạm dừng'},
    {'id': 3, 'label': 'Hoàn Thành'},
  ];
  public status = this.statusList[0];

  constructor(
    private cateService: CategoryService,
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private notifyService: NotificationService,
    private accService: AccountService,
    private dataService: DataService,
    private storyService: StoryService,
  ) {
    this.editStoryForm = this.fb.group({
      name: ['', Validators.required],
      author: ['', Validators.required],
      enterInformation: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.showSelect();
    showImage();
    this.storyId = +this.route.snapshot.params['sid'];
    this.subscriptions.push(this.storyService.getAdminStory(this.storyId).subscribe(
      response => {
        this.story = response;
        // list of category name
        this.story.categoryListInput = response.categoryList.map(response => response.name);
        this.storyStatus = this.story.status;
        // assign value into group of checkboxs
        this.categoryList = new FormArray([...this.story.categoryListInput.map(item => new FormControl(item))]);
        // handle string return
        const search = '<br />';
        const replaceWith = '';
        const result = this.story.infomation.split(search).join(replaceWith)
        // assign value into form fields
        this.editStoryForm.setValue({
          name: this.story.name, 
          author: this.story.author,
          enterInformation: result,
        });
      }, error => this.notifyService.notify(NotificationType.ERROR, error.error.message)
    ));
    this.subscriptions.push(
      this.cateService.getCategories().subscribe(
        (response: Category[]) => {
          this.categories = response;
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  isSelected(name: string): boolean {
    var result = this.story.categoryListInput.find(obj => obj === name);
    if(result) return true;
    return false;
  }

  // convenience getter for easy access to form fields
  get f() { return this.editStoryForm.controls; }

  onCheckboxChange(e: any) {
    const checkArray: FormArray = this.categoryList as FormArray;
    if (e.target.checked) {
      //for checked
      this.categoryList.push(new FormControl(e.target.value));
    } else {
      //for unchecked
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

  valueChange(event: any) {
    const target = event.target.value;
    const strArr = target.split(":");
    this.storyStatus = parseInt(strArr[0]);
  }

  onImageUpload(event: any): void {
    console.log(event.target.files[0])
    this.images = event.target.files[0];
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.editStoryForm.invalid || this.categoryList.value.length == 0) {
      return;
    }
    this.editStoryForm.disable()
    this.loading = true;

    if(this.storyStatus == 0){
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
          this.storyOnSubmited()
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.editStoryForm.enable();
          this.loading = false;
          return;
        }
      })
    }else{
      this.storyOnSubmited()
    }
  }

  storyOnSubmited(){
    var formData: any = new FormData();
    formData.append("name", this.editStoryForm.get('name')!.value);
    formData.append("author", this.editStoryForm.get('author')!.value);
    formData.append("infomation", this.editStoryForm.get('enterInformation')!.value);
    formData.append("category", this.categoryList.value);
    formData.append("status", this.storyStatus);
    formData.append("image", this.images);

    this.subscriptions.push(
      this.accService.updateStory(formData,this.storyId).subscribe(
        (response: Story) => {
          this.notifyService.notify(NotificationType.SUCCESS,"Bạn đã sửa truyện thành công");
          this.editStoryForm.reset();
          this.loading = false;
          this.dataService.updateStatus(7);
          this.router.navigate(['../../quan_ly_truyen'], { relativeTo: this.route });
        },error => {
          this.loading = false;
        },
        () => {
          this.submitted = false;
          this.editStoryForm.enable();
        }
      )
    );
  }

  showSelect() {
    $(document).ready(function () {
      $('.mdb-select').materialSelect();
    });
  }
}
