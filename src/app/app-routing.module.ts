import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './accounts/accounts.component';
import { ForgotPasswordComponent } from './accounts/forgot-password/forgot-password.component';
import { RegisterComponent } from './accounts/register/register.component';
import { AdminNavbarComponent } from './dashboard/admin-navbar/admin-navbar.component';
import { AdminComponent } from './dashboard/admin/admin.component';
import { HomeComponent } from './home/home.component';

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
      { path: 'navbar', component: AdminNavbarComponent },
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
