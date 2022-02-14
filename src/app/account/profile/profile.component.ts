import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { AuthService } from 'src/app/_services/auth.service';
import { NotificationService } from 'src/app/_services/notification.service';

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

  constructor(
    private router: Router,
    private accService: AccountService,
    private notifyService: NotificationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.authService.user.subscribe(user => {
        this.currentUser = user as User;
        this.loggedInUsername = user?.username as string;
      })
    );
  }

  ngOnDestroy(){
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  select(index: number) {
    this.selectedIndex = index;
  }

  onUpdateNotification(notification: any){
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
}
