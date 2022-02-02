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
import { AdminCategoryComponent } from './dashboard/admin-category/admin-category.component';
import { CategoryService } from './_services/category.service';
import { HttpClientModule } from '@angular/common/http';

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
    AdminCategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    FontAwesomeModule,
    HttpClientModule,
  ],
  providers: [CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
