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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AccountsComponent,
    RegisterComponent,
    ProfileComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
