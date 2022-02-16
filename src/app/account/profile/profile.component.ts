import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
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
  private loggedInUsername!: string;
  private subscriptions: Subscription[] = [];
  public reNameForm!: FormGroup;
  submitted = false;

  constructor(
    private router: Router,
    private accService: AccountService,
    private notifyService: NotificationService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.authService.user.subscribe(user => {
        this.currentUser = user as User;
        this.loggedInUsername = user?.username as string;
      })
    );
    this.reNameForm = this.formBuilder.group({
      txtChangenick: ['', Validators.compose([Validators.required, Validators.maxLength(25)])],
    });
  }

  ngOnDestroy(){
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  // convenience getter for easy access to form fields
  get fRename() { return this.reNameForm.controls; }

  select(index: number) {
    this.selectedIndex = index;
  }

  onUpdateNotification(notification: any){
    if(notification.txtAbout == '') {
      this.notifyService.notify(NotificationType.ERROR,'Thông báo mới chưa được cập nhật');
      return;
    }
    this.subscriptions.push(
      this.accService.updateNotification(notification.txtAbout).subscribe(
        (response: User) => {
          this.authService.setCurrentUser(response);
          this.authService.addUserToLocalCache(response);
          this.notifyService.notify(NotificationType.SUCCESS,'Thông báo mới nhất đã được cập nhật');
        }
      )
    );
  }

  onUpdateDisplayedName(){
    this.submitted = true;
    const newNick = this.reNameForm.get('txtChangenick')!.value;
    if(!newNick) return;

    if(!this.currentUser.displayName){
      this.subscriptions.push(
        this.accService.updateDisplayedName(newNick).subscribe(
          (response: User) => {
            this.authService.setCurrentUser(response);
            this.authService.addUserToLocalCache(response);
            this.notifyService.notify(NotificationType.SUCCESS,'Tên đại diện mới đã được cập nhật');
            this.submitted = false;
            this.reNameForm.reset();
          },
          () => {
            this.submitted = false;
            this.reNameForm.reset();
          }
        )
      );
    }else{
      Swal.fire({
        title: 'Xác nhận thực hiện!',
        text: "Sẽ tốn 2000 đậu khi thực hiện, bạn chắc chứ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Vâng, hãy thực hiện!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.subscriptions.push(
            this.accService.updateDisplayedName(newNick).subscribe(
              (response: User) => {
                this.authService.setCurrentUser(response);
                this.authService.addUserToLocalCache(response);
                this.notifyService.notify(NotificationType.SUCCESS,'Tên đại diện mới đã được cập nhật');
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
}