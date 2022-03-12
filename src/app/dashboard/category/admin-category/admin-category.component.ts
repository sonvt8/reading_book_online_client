import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/_models/category';
import { CategoryService } from 'src/app/_services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  page : number[] = [];
  private subscriptions: Subscription[] = [];
  totalPages: number = 0;
  currentPage: number = 1;

  constructor(private categoryService: CategoryService, private router: Router, private toastr: ToastrService) { }


  ngOnInit(): void {
    this.getCategory(1, "");
  }

  getCategory(thePageNumber: number, theKeyword: string){
    if (thePageNumber === undefined) {
      thePageNumber = 1;
    }
    this.subscriptions.push(this.categoryService.getCategoryList(thePageNumber, theKeyword)
        .subscribe(data => {
          this.categories = data.content;
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

  onDeleteCategory(id: number): void{
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
        this.subscriptions.push(this.categoryService.deleteCategory(id).subscribe(data=>{
          this.toastr.success(`Thể loại đã xóa thành công!`);
          this.getCategory(1, "");
        }, error => {
          this.toastr.error(error.error.message);
          this.router.navigateByUrl('/quan-tri/the-loai').then(r => {});
        }
        ));
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        
      }
    })
    
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
