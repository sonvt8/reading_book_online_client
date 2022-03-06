import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';
import { DataService } from 'src/app/_services/data.service';

@Component({
  selector: 'app-account-navbar',
  templateUrl: './account-navbar.component.html',
  styleUrls: ['./account-navbar.component.css']
})
export class AccountNavbarComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public items: Item[] = [];

  constructor(private dataService: DataService, public authService: AuthService,) { }

  ngOnInit(): void {
    this.dataService.returnCurrentItem();
    this.subscriptions.push(
      this.dataService._items.subscribe(obj => {
        if(this.authService.checkRole('ROLE_SMOD')){
          this.items = obj as Item[];
        }else if (this.authService.checkRole('ROLE_ADMIN') || this.authService.checkRole('ROLE_CONVERTER')){
          obj = obj!.filter(ele => !(ele.id === 5));
          this.items = obj as Item[];
        }else{
          obj = obj!.filter(ele => ele.id < 5);
          this.items = obj as Item[];
        }
      })
    );
  }

  ngOnDestroy(){
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  select(index: number) {
    this.dataService.updateStatus(index);
  }
}

interface Item {
  name: string,
  path: string,
  isActive: boolean
}
