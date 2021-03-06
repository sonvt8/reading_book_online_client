import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/_models/category';
import { CategoryService } from 'src/app/_services/category.service';


@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  category: Category = new Category();
  currentId: number = 0;

  constructor(private categoryService: CategoryService, private router: Router, private toastr: ToastrService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleCategoryDetails();
    });
  }

  handleCategoryDetails(): void {
    this.currentId = +this.route.snapshot.params['id'];
    this.categoryService.getCategoryAdminById(this.currentId).subscribe(data => this.category = data);
  }

  submitEditCategory(editForm: NgForm): void {
    this.subscriptions.push(this.categoryService.updateCategory(this.category).subscribe(
        response => {
            console.log(response);
            this.router.navigateByUrl('/quan-tri/the-loai').then(r => {});
            editForm.reset();
            this.toastr.success(`Thể loại ${response.name} cập nhật thành công!`);
        }, error => this.toastr.error(error.error.message)
    ));
  }

  get isActiveBool() {
    return this.category.status == 1
  }
 
  set isActiveBool(newValue:boolean) {
    this.category.status = newValue ? 1 : 0
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
