import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';
import { DataService } from 'src/app/_services/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  public items = [
    {name: 'Hồ sơ',path: 'tai_khoan'},
    {name: 'Truyện Theo Dõi',path: 'tai_khoan/theo_doi'},
    {name: 'Đổi Mật Khẩu',path: '/tai_khoan/doi_mat_khau'},
    {name: 'Truyện Theo Dõi',path: 'tai_khoan/theo_doi'},
    {name: 'Nạp Đậu',path: 'tai_khoan/nap_dau'},
    {name: 'Log Giao Dịch',path: 'tai_khoan/giao_dich'},
    {name: 'Rút Tiền ==> Dành cho mod và converter',path: 'tai_khoan/rut_tien'},
    {name: 'Đăng Truyện',path: 'tai_khoan/them_truyen'},
    {name: 'Quản lý Truyện',path: 'tai_khoan/quan_ly_truyen'}
  ];

  public selectedIndex: number = 0;
  public currentUser: User = new User;
  private subscription: Subscription;
  private loggedInUsername!: string;

  constructor(
    private router: Router,
    private dataService: DataService,
    private authService: AuthService,
  ) {
    this.subscription = this.authService.user.subscribe(user => {
      this.currentUser = user as User;
      this.loggedInUsername = user?.username as string;
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  select(index: number) {
    this.selectedIndex = index;
  }
}
