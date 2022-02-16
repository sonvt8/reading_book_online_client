import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-navbar',
  templateUrl: './account-navbar.component.html',
  styleUrls: ['./account-navbar.component.css']
})
export class AccountNavbarComponent implements OnInit {
  public items = [
    {name: 'Hồ sơ',path: '../',style: false},
    {name: 'Truyện Theo Dõi',path: '../tai_khoan/theo_doi'},
    {name: 'Đổi Mật Khẩu',path: '../tai_khoan/doi_mat_khau'},
    {name: 'Nạp Đậu',path: '../tai_khoan/nap_dau'},
    {name: 'Log Giao Dịch',path: '../tai_khoan/giao_dich'},
    {name: 'Rút Tiền ==> Dành cho mod và converter',path: '../tai_khoan/rut_tien'},
    {name: 'Đăng Truyện',path: '../tai_khoan/them_truyen'},
    {name: 'Quản lý Truyện',path: '../tai_khoan/quan_ly_truyen'}
  ];

  public selectedIndex: number = 0;

  constructor() { }

  ngOnInit(): void {
    
  }

  select(index: number) {
    this.selectedIndex = index;
  }

  isActive(index: number): boolean {
    return this.selectedIndex === index;
  }
}
