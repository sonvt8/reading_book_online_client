import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';

declare var $: any;

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  users: User[] = [];
  page : number[] = [];
  private subscriptions: Subscription[] = [];
  totalPages: number = 0;
  currentPage: number = 1;
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
    this.getUser(1,"");
  }

  getUser(pagenumber: number, search: string){
    if (pagenumber === undefined) {
      pagenumber = 1;
    }
    this.subscriptions.push(this.userService.getAdminUserList(search, this.type.id, pagenumber)
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

  showSelect(){
    $(document).ready(function () {
      $('.mdb-select').materialSelect();
    });
  }

}
