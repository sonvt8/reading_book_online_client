import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DataService } from 'src/app/_services/data.service';

@Component({
  selector: 'app-account-navbar',
  templateUrl: './account-navbar.component.html',
  styleUrls: ['./account-navbar.component.css']
})
export class AccountNavbarComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public items: Item[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.dataService._items.subscribe(obj => {
        this.items = obj as Item[];
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
