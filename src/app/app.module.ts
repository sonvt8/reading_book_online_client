// Module
import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SwiperModule } from 'swiper/angular';
import { EditorModule } from 'primeng/editor';

// Component
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './account/profile/profile.component';
import { AdminNavbarComponent } from './dashboard/admin-navbar/admin-navbar.component';
import { AdminComponent } from './dashboard/admin/admin.component';
import { AdminHomeComponent } from './dashboard/admin-home/admin-home.component';
import { AdminCategoryComponent } from './dashboard/category/admin-category/admin-category.component';
import { CategoryService } from './_services/category.service';
import { UserService } from './_services/user.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddCategoryComponent } from './dashboard/category/add-category/add-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpErrorInterceptor } from './_interceptors/http-error.interceptor';
import { EditCategoryComponent } from './dashboard/category/edit-category/edit-category.component';
import { ListUserComponent } from './dashboard/user/list-user/list-user.component';
import { EditUserComponent } from './dashboard/user/edit-user/edit-user.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { NotificationService } from './_services/notification.service';
import { StoryService } from './_services/story.service';
import { ListStoryComponent } from './dashboard/story/list-story/list-story.component';
import { MembersComponent } from './members/members.component';
import { RegisterComponent } from './members/register/register.component';
import { ForgotPasswordComponent } from './members/forgot-password/forgot-password.component';
import { ErrorComponent } from './error/error.component';
import { AccountNavbarComponent } from './account/account-navbar/account-navbar.component';
import { PasswordChangeComponent } from './account/password-change/password-change.component';
import { EditStoryComponent } from './dashboard/story/edit-story/edit-story.component';
import { CatalogPaginationComponent } from './home/catalog-pagination/catalog-pagination.component';
import { CategoryPaginationComponent } from './home/category-pagination/category-pagination.component';
import { StoryDetailComponent } from './home/story-detail/story-detail.component';
import { AccountFollowComponent } from './account/account-follow/account-follow.component';
import { AccountLogPaymentComponent } from './account/account-log-payment/account-log-payment.component';
import { AccountTopUpComponent } from './account/account-top-up/account-top-up.component';
import { ChapterDetailComponent } from './home/chapter-detail/chapter-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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
import { MemberInterfaceComponent } from './members/navtabs/member-interface/member-interface.component';
import { MemberStoriesComponent } from './members/navtabs/member-stories/member-stories.component';
import { NoSanitizePipe } from './_pipes/no-sanitize.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    MembersComponent,
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
    EditUserComponent,
    ListStoryComponent,
    ErrorComponent,
    AccountNavbarComponent,
    EditStoryComponent,
    CatalogPaginationComponent,
    CategoryPaginationComponent,
    PasswordChangeComponent,
    StoryDetailComponent,
    PasswordChangeComponent,
    AccountFollowComponent,
    AccountLogPaymentComponent,
    AccountTopUpComponent,
    ChapterDetailComponent,
    StorySubmitComponent,
    ManageStoryComponent,
    ChapterComponent,
    ChapterNewComponent,
    AccEditStoryComponent,
    AccountWithdrawComponent,
    ChapterEditComponent,
    LoginComponent,
    MemberInterfaceComponent,
    MemberStoriesComponent,
    NoSanitizePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    MultiSelectModule,
    DropdownModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ timeOut: 5000, positionClass: 'toast-bottom-right', preventDuplicates: true }),
    SwiperModule,
    NgbModule,
    EditorModule
  ],
  providers: [
    CategoryService,
    UserService,
    NotificationService,
    StoryService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    Title,
    AuthenticationGuard,
    RoleGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }