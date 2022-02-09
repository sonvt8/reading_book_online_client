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
import { EditUserComponent } from './dashboard/user/edit-user/edit-user.component';

const routes: Routes = [
  { 
    path: 'home', 
    component: HomeComponent,
    children:[
      { path: 'tai_khoan', component: AccountsComponent },
      { path: 'dang_ky', component: RegisterComponent },
      { path: 'quen_mat_khau', component: ForgotPasswordComponent },
    ]
  },
  { 
    path: 'quan_tri', 
    component: AdminComponent,
    children:[
      { path: '', component: AdminHomeComponent },
      { path: 'home', component: AdminHomeComponent },
      { path: 'the_loai', component: AdminCategoryComponent },
      { path: 'the_loai/:id', component: EditCategoryComponent },
      { path: 'them_the_loai', component: AddCategoryComponent },
      { path: 'nguoi_dung', component: ListUserComponent },
      { path: 'nguoi_dung/:id', component: EditUserComponent },
    ]
  },
  

  // Always put default route at the end.
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
