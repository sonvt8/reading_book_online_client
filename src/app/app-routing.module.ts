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
import { EditStoryComponent } from './dashboard/story/edit-story/edit-story.component';
import { CatalogPaginationComponent } from './home/catalog-pagination/catalog-pagination.component';
import { CategoryPaginationComponent } from './home/category-pagination/category-pagination.component';
import { PasswordChangeComponent } from './account/password-change/password-change.component';
import { StoryDetailComponent } from './home/story-detail/story-detail.component';
import { AccountFollowComponent } from './account/account-follow/account-follow.component';
import { AccountLogPaymentComponent } from './account/account-log-payment/account-log-payment.component';
import { AccountTopUpComponent } from './account/account-top-up/account-top-up.component';
import { ChapterDetailComponent } from './home/chapter-detail/chapter-detail.component';
import { StorySubmitComponent } from './account/story-submit/story-submit.component';
import { ManageStoryComponent } from './account/manage-story/manage-story.component';
import { ChapterComponent } from './account/chapter/chapter.component';
import { ChapterNewComponent } from './account/chapter/chapter-new/chapter-new.component';
import { AuthenticationGuard } from './_guards/authentication.guard';
import { RoleGuard } from './_guards/role.guard';
import { AccEditStoryComponent } from './account/edit-story/acc-edit-story.component';
import { AccountWithdrawComponent } from './account/account-withdraw/account-withdraw.component';
import { ChapterEditComponent } from './account/chapter/chapter-edit/chapter-edit.component';
import { LoginComponent } from './members/login/login.component';

const routes: Routes = [
  { path: 'trang-chu', component: HomeComponent, data: {title: 'Trang Chủ'}},
  
  { 
    path: 'thanh_vien', 
    children:[
      { path: '', component: MembersComponent, data: {title: 'Đăng nhập'}},
      { path: 'dang_nhap', component: LoginComponent, data: {title: 'Đăng nhập'}},
      { path: 'dang_ky', component: RegisterComponent, data: {title: 'Đăng ký'}},
      { path: 'quen_mat_khau', component: ForgotPasswordComponent, data: {title: 'Quên mật khẩu'}},
      { path: 'thong_tin/:tcid', component: MembersComponent, data: {title: 'Thông tin thành viên'}},
    ]
  },
  { 
    path: 'tai_khoan', 
    children:[
      { path: '', component: ProfileComponent, data: {title: 'Hồ sơ'}, canActivate: [AuthenticationGuard] },
      { path: 'doi_mat_khau', component: PasswordChangeComponent, data: {title: 'Đổi mật khẩu'}, canActivate: [AuthenticationGuard]},
      { path: 'theo_doi', component: AccountFollowComponent, data: {title: 'Theo dõi truyện'}, canActivate: [AuthenticationGuard]},
      { path: 'giao_dich', component: AccountLogPaymentComponent, data: {title: 'Lich sử giao dịch'}, canActivate: [AuthenticationGuard]},
      { path: 'nap_dau', component: AccountTopUpComponent, data: {title: 'Trang nạp đậu'}, canActivate: [AuthenticationGuard]},
      { path: 'rut_tien', component: AccountWithdrawComponent, data: {title: 'Trang rút tiền', roles: ['ROLE_CONVERTER', 'ROLE_SMOD']}, canActivate: [AuthenticationGuard, RoleGuard]},
      { path: 'them_truyen', component: StorySubmitComponent, data: {title: 'Đăng truyện', roles: ['ROLE_CONVERTER', 'ROLE_SMOD']}, canActivate: [AuthenticationGuard, RoleGuard]},
      { path: 'sua_truyen/:sid', component: AccEditStoryComponent, data: {title: 'Sửa truyện', roles: ['ROLE_CONVERTER', 'ROLE_SMOD']}, canActivate: [AuthenticationGuard, RoleGuard]},
      { path: 'quan_ly_truyen', component: ManageStoryComponent, data: {title: 'Quản lý truyện', roles: ['ROLE_CONVERTER', 'ROLE_SMOD']}, canActivate: [AuthenticationGuard, RoleGuard]},
      { path: 'them_chuong_truyen/:sid', component: ChapterNewComponent, data: {title: 'Thêm chương truyện', roles: ['ROLE_CONVERTER', 'ROLE_SMOD']}, canActivate: [AuthenticationGuard, RoleGuard]},
      { path: 'chuong_cua_truyen/:sid', component: ChapterComponent, data: {title: 'Xem danh sách chương', roles: ['ROLE_CONVERTER', 'ROLE_SMOD']}, canActivate: [AuthenticationGuard, RoleGuard]},
      { path: 'sua_chuong_truyen/:sid/:cid', component: ChapterEditComponent, data: {title: 'Sửa chương truyện', roles: ['ROLE_CONVERTER', 'ROLE_SMOD']}, canActivate: [AuthenticationGuard, RoleGuard]},
    ]
  },
  {
    path: 'quan-tri',
    component: AdminComponent,
    children:[
      { path: '', component: AdminHomeComponent, data: {title: 'Trang quản lý', roles: ['ROLE_ADMIN', 'ROLE_SMOD']}, canActivate: [AuthenticationGuard, RoleGuard]},
      { path: 'trang-quan-ly', component: AdminHomeComponent, data: {title: 'Trang quản lý', roles: ['ROLE_ADMIN', 'ROLE_SMOD']}, canActivate: [AuthenticationGuard, RoleGuard]},
      { path: 'the-loai', component: AdminCategoryComponent, data: {title: 'Danh sách thể loại', roles: ['ROLE_ADMIN', 'ROLE_SMOD']}, canActivate: [AuthenticationGuard, RoleGuard]},
      { path: 'the-loai/:id', component: EditCategoryComponent, data: {title: ' Cập nhật Thể loại', roles: ['ROLE_ADMIN', 'ROLE_SMOD']}, canActivate: [AuthenticationGuard, RoleGuard]},
      { path: 'them-the-loai', component: AddCategoryComponent, data: {title: 'Thêm thể loại', roles: ['ROLE_ADMIN', 'ROLE_SMOD']}, canActivate: [AuthenticationGuard, RoleGuard]},
      { path: 'nguoi-dung', component: ListUserComponent, data: {title: 'Danh sách tài khoản', roles: ['ROLE_ADMIN']}, canActivate: [AuthenticationGuard, RoleGuard]},
      { path: 'nguoi-dung/:id', component: EditUserComponent, data: {title: 'Cập nhật người dùng', roles: ['ROLE_ADMIN']}, canActivate: [AuthenticationGuard, RoleGuard] },
      { path: 'truyen', component: ListStoryComponent, data: {title: 'Danh sách truyện', roles: ['ROLE_ADMIN', 'ROLE_SMOD']}, canActivate: [AuthenticationGuard, RoleGuard] },
      { path: 'truyen/:id', component: EditStoryComponent, data: {title: 'Cập nhật truyện', roles: ['ROLE_ADMIN', 'ROLE_SMOD']}, canActivate: [AuthenticationGuard, RoleGuard] },
    ]
  },

  { path: 'danh-muc/:catalog', component: CatalogPaginationComponent, data: {title: 'Danh mục truyện' }},
  { path: 'the-loai/:cid', component: CategoryPaginationComponent, data: {title: 'Thể loại truyện' }},
  { path: 'truyen-home/:sid', component: StoryDetailComponent, data: {title: 'Chi tiết truyện' }},
  { path: 'truyen-home/:sid/:chid', component: ChapterDetailComponent, data: {title: 'Chi tiết chương' }},

  // Always put default route at the end.
  { path: '', redirectTo: '/trang-chu', pathMatch: 'full', data: { title: 'Trang chủ' } },
  { path: '**', component: ErrorComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
