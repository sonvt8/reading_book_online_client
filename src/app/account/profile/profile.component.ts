import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { AccountOnHomePage } from 'src/app/_models/account-home-page';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { AuthService } from 'src/app/_services/auth.service';
import { NotificationService } from 'src/app/_services/notification.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  public selectedIndex: number = 0;
  public currentUser: User = new User;
  public accountInfo: AccountOnHomePage = new AccountOnHomePage;
  private subscriptions: Subscription[] = [];
  public reNameForm!: FormGroup;
  public submitted = false;
  public url: string = this.authService.getUserFromLocalCache().avatar;
  public avatar: File | null = null ;
  public isChanged: boolean = false;

  constructor(
    private router: Router,
    private accService: AccountService,
    private notifyService: NotificationService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.accService._account.subscribe(
        (response: any) => {
          this.accountInfo = response;
          this.url = this.accountInfo.avatar;
        }
      )
    );
    this.reNameForm = this.formBuilder.group({
      txtChangenick: ['', Validators.compose([Validators.required, Validators.maxLength(120)])],
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  // convenience getter for easy access to form fields
  get fRename() { return this.reNameForm.controls; }

  select(index: number) {
    this.selectedIndex = index;
  }

  onUpdateNotification(notification: any) {
    if (notification.txtAbout == '') {
      this.notifyService.notify(NotificationType.ERROR, 'Th??ng b??o m???i ch??a ???????c c???p nh???t');
      return;
    }
    this.subscriptions.push(
      this.accService.updateNotification(notification.txtAbout).subscribe(
        (response: User) => {
          this.accountInfo.notification = response.notification;
          this.accService.setCurrentAccount(this.accountInfo);
          this.authService.setCurrentUser(response);
          this.authService.addUserToLocalCache(response);
          this.notifyService.notify(NotificationType.SUCCESS, 'Th??ng b??o m???i nh???t ???? ???????c c???p nh???t');
        }
      )
    );
  }

  onUpdateDisplayedName() {
    this.submitted = true;
    const newNick = this.reNameForm.get('txtChangenick')!.value;
    if (!newNick) return;

    // stop here if form is invalid
    if (this.reNameForm.invalid) {
      return;
    }

    if (!this.accountInfo.displayName) {
      this.subscriptions.push(
        this.accService.updateDisplayedName(newNick).subscribe(
          (response: User) => {
            this.accountInfo.displayName = response.displayName;
            this.accountInfo.gold = response.gold;
            this.accService.setCurrentAccount(this.accountInfo);
            this.authService.setCurrentUser(response);
            this.authService.addUserToLocalCache(response);
            this.notifyService.notify(NotificationType.SUCCESS, 'T??n ?????i di???n m???i ???? ???????c c???p nh???t');
            this.submitted = false;
            this.reNameForm.reset();
          },
          () => {
            this.submitted = false;
            this.reNameForm.reset();
          }
        )
      );
    } else {
      Swal.fire({
        title: 'X??c nh???n th???c hi???n!',
        text: "S??? t???n 2000 ?????u khi th???c hi???n, b???n ch???c ch????",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'V??ng, h??y th???c hi???n!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.subscriptions.push(
            this.accService.updateDisplayedName(newNick).subscribe(
              (response: User) => {
                this.accountInfo.displayName = response.displayName;
                this.accountInfo.gold = response.gold;
                this.accService.setCurrentAccount(this.accountInfo);
                this.authService.setCurrentUser(response);
                this.authService.addUserToLocalCache(response);
                this.notifyService.notify(NotificationType.SUCCESS, 'T??n ?????i di???n m???i ???? ???????c c???p nh???t');
                this.submitted = false;
                this.reNameForm.reset();
              },
              () => {
                this.submitted = false;
                this.reNameForm.reset();
              }
            )
          )
        }
      });
    }
  }

  onSelectFile(event: any) {
    console.log(event);
    if (event.target.files && event.target.files![0]) {
      this.isChanged = true;
      this.avatar = event.target.files[0];
      var reader = new FileReader();
      console.log(this.avatar);

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.url = event.target.result as string;
      }
    }
  }
  public delete() {
    this.url = this.authService.getUserFromLocalCache().avatar;
    this.avatar = null;
  }

  public upload() {
    var formData: any = new FormData();
    formData.append("profileImage",this.avatar);
    this.subscriptions.push(
      this.accService.updateAvatar(formData).subscribe(
        (response: User) => {
          this.accountInfo.avatar = response.avatar;
          this.accService.setCurrentAccount(this.accountInfo);
          this.authService.setCurrentUser(response);
          this.authService.addUserToLocalCache(response);
          this.notifyService.notify(NotificationType.SUCCESS, '???? th???c hi???n c???p nh???t ???nh ?????i di???n');
          this.isChanged = false;
        }
      )
    );
  }
}
