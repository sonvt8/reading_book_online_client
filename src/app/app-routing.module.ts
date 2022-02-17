import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MembersComponent } from './members/members.component';
import { ForgotPasswordComponent } from './members/forgot-password/forgot-password.component';
import { RegisterComponent } from './members/register/register.component';
import { AddCategoryComponent } from './dashboard/category/add-category/add-category.component';
import { AdminCategoryComponent } from './dashboard/category/admin-category/admin-category.component';
import { AdminHomeComponent } from './dashboard/admin-home/admin-home.component';
import { AdminComponent } from './dashboard/admin/admin.component';
import { HomeComponent } from './home/home.component';
import { EditCategoryComponent } from './dashboard/category/edit-category/edit-category.component';
import { ListUserComponent } from './dashboard/user/list-user/list-user.component';
import { AppComponent } from './app.component';
import { EditUserComponent } from './dashboard/user/edit-user/edit-user.component';
import { ListStoryComponent } from './dashboard/story/list-story/list-story.component';
import { ErrorComponent } from './error/error.component';
import { ProfileComponent } from './account/profile/profile.component';
import { StoryComponent } from './story/story.component';

const routes: Routes = [
  { path: 'trang-chu', component: HomeComponent, data: { title: 'Trang Chủ' } },
  {
    path: 'thanh_vien',
    children: [
      { path: '', component: MembersComponent, data: { title: 'Đăng nhập' } },
      { path: 'dang_nhap', component: MembersComponent, data: { title: 'Đăng nhập' } },
      { path: 'dang_ky', component: RegisterComponent, data: { title: 'Đăng ký' } },
      { path: 'quen_mat_khau', component: ForgotPasswordComponent, data: { title: 'Quên mật khẩu' } }
    ]
  },
  {
    path: 'tai_khoan',
    children: [
      { path: '', component: ProfileComponent, data: { title: 'Hồ sơ' } }
    ]
  },
  {
    path: 'quan-tri',
    component: AdminComponent,
    children: [
      { path: '', component: AdminHomeComponent, data: { title: 'Trang quản lý' } },
      { path: 'trang-quan-ly', component: AdminHomeComponent, data: { title: 'Trang quản lý' } },
      { path: 'the-loai', component: AdminCategoryComponent, data: { title: 'Danh sách thể loại' } },
      { path: 'the-loai/:id', component: EditCategoryComponent, data: { title: ' Cập nhật Thể loại' } },
      { path: 'them-the-loai', component: AddCategoryComponent, data: { title: 'Thêm thể loại' } },
      { path: 'nguoi-dung', component: ListUserComponent, data: { title: 'Danh sách tài khoản' } },
      { path: 'nguoi-dung/:id', component: EditUserComponent, data: { title: 'Cập nhật người dùng' } },
      { path: 'truyen', component: ListStoryComponent, data: { title: 'Danh sách truyện' } },
    ]
  },
  { path: 'truyen', component: StoryComponent, data: { title: 'Tên truyện' } },

  // Always put default route at the end.
  { path: '', redirectTo: '/trang-chu', pathMatch: 'full', data: { title: 'Trang chủ' } },
  { path: '**', component: ErrorComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
