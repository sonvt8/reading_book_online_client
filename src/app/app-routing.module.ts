import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './accounts/accounts.component';
import { ForgotPasswordComponent } from './accounts/forgot-password/forgot-password.component';
import { RegisterComponent } from './accounts/register/register.component';
import { AddCategoryComponent } from './dashboard/category/add-category/add-category.component';
import { AdminCategoryComponent } from './dashboard/category/admin-category/admin-category.component';
import { AdminHomeComponent } from './dashboard/admin-home/admin-home.component';
import { AdminComponent } from './dashboard/admin/admin.component';
import { HomeComponent } from './home/home.component';
import { EditCategoryComponent } from './dashboard/category/edit-category/edit-category.component';
import { ListUserComponent } from './dashboard/user/list-user/list-user.component';

const routes: Routes = [
  { 
    path: 'trang-chu', 
    component: HomeComponent,
    children:[
      { path: 'dang-nhap', component: AccountsComponent, data: {title: 'Đăng nhập'}},
      { path: 'dang-ky', component: RegisterComponent, data: {title: 'Đăng ký'}},
      { path: 'quen-mat-khau', component: ForgotPasswordComponent, data: {title: 'Quên mật khẩu'}},
    ]
  },
  { 
    path: 'admin', 
    component: AdminComponent,
    children:[
      { path: '', component: AdminHomeComponent, data: {title: 'Trang quản lý'}},
      { path: 'home', component: AdminHomeComponent, data: {title: 'Trang quản lý'}},
      { path: 'category', component: AdminCategoryComponent, data: {title: 'Danh sách thể loại'}},
      { path: 'category/:id', component: EditCategoryComponent, data: {title: 'Thể loại'}},
      { path: 'add-category', component: AddCategoryComponent, data: {title: 'Thêm thể loại'}},
      { path: 'user', component: ListUserComponent, data: {title: 'Danh sách tài khoản'}},
    ]
  },
  

  // Always put default route at the end.
  { path: '', redirectTo: '/trang-chu', pathMatch: 'full', data: {title: 'Trang chủ'} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
