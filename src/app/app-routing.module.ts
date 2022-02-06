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
    path: 'home', 
    component: HomeComponent,
    children:[
      { path: 'accounts', component: AccountsComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
    ]
  },
  { 
    path: 'admin', 
    component: AdminComponent,
    children:[
      { path: '', component: AdminHomeComponent },
      { path: 'home', component: AdminHomeComponent },
      { path: 'category', component: AdminCategoryComponent },
      { path: 'category/:id', component: EditCategoryComponent },
      { path: 'add-category', component: AddCategoryComponent },
      { path: 'user', component: ListUserComponent },
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
