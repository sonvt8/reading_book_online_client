import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Story } from 'src/app/_models/story';
import { StoryService } from 'src/app/_services/story.service';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-list-story',
  templateUrl: './list-story.component.html',
  styleUrls: ['./list-story.component.css']
})
export class ListStoryComponent implements OnInit {
  search: string = "";
  stories: Story[] = [];
  page : number[] = [];
  private subscriptions: Subscription[] = [];
  totalPages: number = 0;
  currentPage: number = 1;

  typeList = [
    {'id': -1, 'label': 'Tất Cả'},
    {'id': 0, 'label': 'Khóa'},
    {'id': 1, 'label': 'Đang Ra'},
    {'id': 2, 'label': 'Hoàn Thành'},
    {'id': 3, 'label': 'Vip'},
  ];
  type = this.typeList[0];

  constructor(private storyService: StoryService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.showSelect();
    this.getStory(1);
  }

  getStory(pagenumber: number){
    if (pagenumber === undefined) {
      pagenumber = 1;
    }
    const data = new FormData();
    data.append('pagenumber', JSON.stringify(pagenumber = "" ? 0 : pagenumber));
    data.append('search', this.search.trim());
    data.append('type', JSON.stringify(this.type.id));
    
    this.subscriptions.push(this.storyService.getStoryList(data)
        .subscribe(data => {
          this.stories = data.content;
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

  onDeleteStory(id: number): void{
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng Ý',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.value) {
        this.subscriptions.push(this.storyService.deleteStory(id).subscribe(data=>{
          this.toastr.success(`Truyện đã xóa thành công!`);
          this.getStory(1);
        }, error => this.toastr.error(error.error.message)
        ));
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        
      }
    })
    
  }

  showSelect(){
    $(document).ready(function () {
      $('.mdb-select').materialSelect();
    });
  }

}
