import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  search: string = "";
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

  constructor(private userService: UserService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.showSelect();
    this.getUser(1);
  }


  getUser(pagenumber: number){
    if (pagenumber === undefined) {
      pagenumber = 1;
    }
    const data = new FormData();
    data.append('pagenumber', JSON.stringify(pagenumber));
    data.append('search', this.search.trim());
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

  onDeleteAdminUser(user: User): void{
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
        this.subscriptions.push(this.userService.deleteAdminUser(user).subscribe(data=>{
          this.toastr.success(`Người dùng ${user.username} đã bị xóa thành công!`);
          this.getUser(1);
        }, error => this.toastr.error(error.error.message)
        ));
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        
      }
    })
    
  }

  submitPayhDraw(payDrawForm: NgForm): void {
    const data = new FormData();
    data.append("money", JSON.stringify(this.payCoin));
    data.append("reId", JSON.stringify(this.userId));
    $('#submitPD').val("Đang Xử Lý").attr("disabled", true);
    $('#numberExample').attr('readonly', true);
    $('#canSubmit').attr("disabled", true);
    this.subscriptions.push(this.userService.payDrawAdminUser(data).subscribe(
        response => {
          //templates.modal('hide');
          // $("#submitPD").attr("disabled", false).val("Đăng Ký");
          // $('#numberExample').attr('readonly', false);
          // $('#canSubmit').attr("disabled", false);
          this.router.navigateByUrl('/quan-tri/nguoi-dung').then(r => {});
          payDrawForm.reset();
          this.toastr.success(`Tài khoản ${response.username} nạp đậu thành công!`);
        }, error => this.toastr.error(error.error.message)
    ));
  }

  setID(userId: number){
    this.userId = userId;
  }

  reset(){
    this.payCoin = 0;
  }

  showSelect(){
    $(document).ready(function () {
      $('.mdb-select').materialSelect();
    });
  }
  
}
