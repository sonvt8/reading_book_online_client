import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/_services/category.service';


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  constructor(private categoryService: CategoryService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onAddNewCategory(newForm: NgForm): void {

    this.subscriptions.push(this.categoryService.addCategory(newForm.value).subscribe(
        response => {
          console.log(response);
          newForm.reset();
          this.router.navigateByUrl('/quan-tri/the-loai').then(r => {});
          this.toastr.success(`Thể loại ${response.name} được thêm mới thành công`);
        }, error => {
          this.toastr.error(error.error.message);
        }
    ));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
