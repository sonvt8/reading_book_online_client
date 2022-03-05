import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit, OnDestroy {
  searchUser: string = "";
  currentUser : User = new User;
  users: User[] = [];
  page : number[] = [];
  private subscriptions: Subscription[] = [];
  totalPages: number = 0;
  currentPage: number = 1;
  payCoin: number = 0;
  userId: number = 0;
  typeList = [
    {'id': 4, 'label': 'USER'},
    {'id': 1, 'label': 'ADMIN'},
    {'id': 2, 'label': 'MOD'},
    {'id': 3, 'label': 'CONVERTER'}
  ];
  type = this.typeList[0];

  constructor(private userService: UserService, private router: Router, private toastr: ToastrService,public authService: AuthService,) { }

  ngOnInit(): void {
    this.showSelect();
    this.getUser(1);
    this.currentUser = this.authService.getUserFromLocalCache();
  }


  getUser(pagenumber: number){
    if (pagenumber === undefined) {
      pagenumber = 1;
    }
    const data = new FormData();
    data.append('pagenumber', JSON.stringify(pagenumber));
    data.append('search', this.searchUser.trim());
    data.append('type', JSON.stringify(this.type.id));
    
    this.subscriptions.push(this.userService.getAdminUserList(data)
        .subscribe(data => {
          this.users = data.content;
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

  // onDeleteAdminUser(user: User): void{
  //   Swal.fire({
  //     title: 'Are you sure want to remove?',
  //     text: 'You will not be able to recover this file!',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Đồng Ý',
  //     cancelButtonText: 'Hủy'
  //   }).then((result) => {
  //     if (result.value) {
  //       this.subscriptions.push(this.userService.deleteAdminUser(user).subscribe(data=>{
  //         this.toastr.success(`Người dùng ${user.username} đã bị xóa thành công!`);
  //         this.getUser(1);
  //       }, error => this.toastr.error(error.error.message)
  //       ));
  //     } else if (result.dismiss === Swal.DismissReason.cancel) {
        
  //     }
  //   })
    
  // }

  submitPayhDraw(payDrawForm: NgForm): void {
    const data = new FormData();
    data.append("money", payDrawForm.value.payCoin);
    data.append("reId", JSON.stringify(this.userId));
    this.subscriptions.push(this.userService.payDrawAdminUser(data).subscribe(
        response => {
          //this.router.navigateByUrl('/quan-tri/nguoi-dung').then(r => {});
          //payDrawForm.reset();
          //payDrawForm.value.payCoin = 0;
          Swal.fire({
            text: "Nạp đậu thành tiền mặt thành công!",
            icon: 'success',
            confirmButtonText: 'Ok'
          })
        }, error => {
          Swal.fire({
            text: error.error.message,
            icon: 'warning',
            confirmButtonText: 'Ok'
          })
        }
    ));
  }

  setID(userId: number){
    this.userId = userId;
  }

  reset(){
    this.payCoin = 0;
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
