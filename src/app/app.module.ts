// Module
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

// Component
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AccountsComponent } from './accounts/accounts.component';
import { RegisterComponent } from './accounts/register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { ForgotPasswordComponent } from './accounts/forgot-password/forgot-password.component';
import { AdminNavbarComponent } from './dashboard/admin-navbar/admin-navbar.component';
import { AdminComponent } from './dashboard/admin/admin.component';
import { AdminHomeComponent } from './dashboard/admin-home/admin-home.component';
import { AdminCategoryComponent } from './dashboard/category/admin-category/admin-category.component';
import { CategoryService } from './_services/category.service';
import { UserService } from './_services/user.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddCategoryComponent } from './dashboard/category/add-category/add-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import { HttpErrorInterceptor } from './_interceptors/http-error.interceptor';
import { EditCategoryComponent } from './dashboard/category/edit-category/edit-category.component';
import { ListUserComponent } from './dashboard/user/list-user/list-user.component';
import { AddUserComponent } from './dashboard/user/add-user/add-user.component';
import { EditUserComponent } from './dashboard/user/edit-user/edit-user.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AccountsComponent,
    RegisterComponent,
    ProfileComponent,
    ForgotPasswordComponent,
    AdminNavbarComponent,
    AdminComponent,
    AdminHomeComponent,
    AdminCategoryComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    ListUserComponent,
    AddUserComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({timeOut: 5000, positionClass: 'toast-bottom-right', preventDuplicates: true}),
  ],
  providers: [CategoryService, UserService, {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true},],
  bootstrap: [AppComponent]
})
export class AppModule { }
