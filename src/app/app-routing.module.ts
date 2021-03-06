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
  { path: 'trang-chu', component: HomeComponent, data: {title: 'Trang Ch???'}},
  
  { 
    path: 'thanh_vien', 
    children:[
      { path: '', component: MembersComponent, data: {title: '????ng nh???p'}},
      { path: 'dang_nhap', component: LoginComponent, data: {title: '????ng nh???p'}},
      { path: 'dang_ky', component: RegisterComponent, data: {title: '????ng k??'}},
      { path: 'quen_mat_khau', component: ForgotPasswordComponent, data: {title: 'Qu??n m???t kh???u'}},
      { path: 'thong_tin/:tcid', component: MembersComponent, data: {title: 'Th??ng tin th??nh vi??n'}},
    ]
  },
  { 
    path: 'tai_khoan', 
    children:[
      { path: '', component: ProfileComponent, data: {title: 'H??? s??'}, canActivate: [AuthenticationGuard] },
      { path: 'doi_mat_khau', component: PasswordChangeComponent, data: {title: '?????i m???t kh???u'}, canActivate: [AuthenticationGuard]},
      { path: 'theo_doi', component: AccountFollowComponent, data: {title: 'Theo d??i truy???n'}, canActivate: [AuthenticationGuard]},
      { path: 'giao_dich', component: AccountLogPaymentComponent, data: {title: 'Lich s??? giao d???ch'}, canActivate: [AuthenticationGuard]},
      { path: 'nap_dau', component: AccountTopUpComponent, data: {title: 'Trang n???p ?????u'}, canActivate: [AuthenticationGuard]},
      { path: 'rut_tien', component: AccountWithdrawComponent, data: {title: 'Trang r??t ti???n', roles: ['ROLE_CONVERTER', 'ROLE_SMOD']}, canActivate: [AuthenticationGuard, RoleGuard]},
      { path: 'them_truyen', component: StorySubmitComponent, data: {title: '????ng truy???n', roles: ['ROLE_CONVERTER', 'ROLE_SMOD']}, canActivate: [AuthenticationGuard, RoleGuard]},
      { path: 'sua_truyen/:sid', component: AccEditStoryComponent, data: {title: 'S???a truy???n', roles: ['ROLE_CONVERTER', 'ROLE_SMOD']}, canActivate: [AuthenticationGuard, RoleGuard]},
      { path: 'quan_ly_truyen', component: ManageStoryComponent, data: {title: 'Qu???n l?? truy???n', roles: ['ROLE_CONVERTER', 'ROLE_SMOD']}, canActivate: [AuthenticationGuard, RoleGuard]},
      { path: 'them_chuong_truyen/:sid', component: ChapterNewComponent, data: {title: 'Th??m ch????ng truy???n', roles: ['ROLE_CONVERTER', 'ROLE_SMOD']}, canActivate: [AuthenticationGuard, RoleGuard]},
      { path: 'chuong_cua_truyen/:sid', component: ChapterComponent, data: {title: 'Xem danh s??ch ch????ng', roles: ['ROLE_CONVERTER', 'ROLE_SMOD']}, canActivate: [AuthenticationGuard, RoleGuard]},
      { path: 'sua_chuong_truyen/:sid/:cid', component: ChapterEditComponent, data: {title: 'S???a ch????ng truy???n', roles: ['ROLE_CONVERTER', 'ROLE_SMOD']}, canActivate: [AuthenticationGuard, RoleGuard]},
    ]
  },
  {
    path: 'quan-tri',
    component: AdminComponent,
    children:[
      { path: '', component: AdminHomeComponent, data: {title: 'Trang qu???n l??', roles: ['ROLE_ADMIN', 'ROLE_SMOD']}, canActivate: [AuthenticationGuard, RoleGuard]},
      { path: 'trang-quan-ly', component: AdminHomeComponent, data: {title: 'Trang qu???n l??', roles: ['ROLE_ADMIN', 'ROLE_SMOD']}, canActivate: [AuthenticationGuard, RoleGuard]},
      { path: 'the-loai', component: AdminCategoryComponent, data: {title: 'Danh s??ch th??? lo???i', roles: ['ROLE_ADMIN', 'ROLE_SMOD']}, canActivate: [AuthenticationGuard, RoleGuard]},
      { path: 'the-loai/:id', component: EditCategoryComponent, data: {title: ' C???p nh???t Th??? lo???i', roles: ['ROLE_ADMIN', 'ROLE_SMOD']}, canActivate: [AuthenticationGuard, RoleGuard]},
      { path: 'them-the-loai', component: AddCategoryComponent, data: {title: 'Th??m th??? lo???i', roles: ['ROLE_ADMIN', 'ROLE_SMOD']}, canActivate: [AuthenticationGuard, RoleGuard]},
      { path: 'nguoi-dung', component: ListUserComponent, data: {title: 'Danh s??ch t??i kho???n', roles: ['ROLE_ADMIN']}, canActivate: [AuthenticationGuard, RoleGuard]},
      { path: 'nguoi-dung/:id', component: EditUserComponent, data: {title: 'C???p nh???t ng?????i d??ng', roles: ['ROLE_ADMIN']}, canActivate: [AuthenticationGuard, RoleGuard] },
      { path: 'truyen', component: ListStoryComponent, data: {title: 'Danh s??ch truy???n', roles: ['ROLE_ADMIN', 'ROLE_SMOD']}, canActivate: [AuthenticationGuard, RoleGuard] },
      { path: 'truyen/:id', component: EditStoryComponent, data: {title: 'C???p nh???t truy???n', roles: ['ROLE_ADMIN', 'ROLE_SMOD']}, canActivate: [AuthenticationGuard, RoleGuard] },
    ]
  },

  { path: 'danh-muc/:catalog', component: CatalogPaginationComponent, data: {title: 'Danh m???c truy???n' }},
  { path: 'the-loai/:cid', component: CategoryPaginationComponent, data: {title: 'Th??? lo???i truy???n' }},
  { path: 'truyen-home/:sid', component: StoryDetailComponent, data: {title: 'Chi ti???t truy???n' }},
  { path: 'truyen-home/:sid/:chid', component: ChapterDetailComponent, data: {title: 'Chi ti???t ch????ng' }},

  // Always put default route at the end.
  { path: '', redirectTo: '/trang-chu', pathMatch: 'full', data: { title: 'Trang ch???' } },
  { path: '**', component: ErrorComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
