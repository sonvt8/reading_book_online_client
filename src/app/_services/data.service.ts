import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AdminHome } from '../_models/admin-home';
import { Category } from '../_models/category';
import { Information } from '../_models/information';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = environment.apiUrl;
  private itemSubject: BehaviorSubject<Item[] | null>;
  public _items: Observable<Item[] | null>;

  constructor(private httpClient: HttpClient,private router: Router) { 
    this.itemSubject = new BehaviorSubject<Item[] | null>(
      [
        {id: 0,name: 'Hồ sơ',path: '/tai_khoan',isActive: false},
        {id: 1,name: 'Truyện Theo Dõi',path: '/tai_khoan/theo_doi',isActive: false},
        {id: 2,name: 'Đổi Mật Khẩu',path: '/tai_khoan/doi_mat_khau',isActive: false},
        {id: 3,name: 'Nạp Đậu',path: '/tai_khoan/nap_dau',isActive: false},
        {id: 4,name: 'Log Giao Dịch',path: '/tai_khoan/giao_dich',isActive: false},
        {id: 5,name: 'Rút Tiền',path: '/tai_khoan/rut_tien',isActive: false},
        {id: 6,name: 'Đăng Truyện',path: '/tai_khoan/them_truyen',isActive: false},
        {id: 7,name: 'Quản lý Truyện',path: '/tai_khoan/quan_ly_truyen',isActive: false}
      ]
    );
    this._items = this.itemSubject.asObservable(); 
  }

  public getData(): Observable<GetInformationResponse> {
    return this.httpClient.get<GetInformationResponse>(`${this.baseUrl}thong-tin`);
  }

  public getCountAdminHome(): Observable<AdminHome> {
    return this.httpClient.get<AdminHome>(`${this.baseUrl}quan-tri`);
  }

  public get itemValue(): Item[] | null {
    return this.itemSubject.value;
  }

  public setCurrentItems(items: Item[]) {
    this.itemSubject.next(items);
  }

  // public clearStatusItem(){
  //   const items = this.itemSubject.value;
  //   items!.map(item => {
  //     return item.isActive = false;
  //   })
  //   this.setCurrentItems(items!);
  // }

  public updateStatus(id: number){
    const items = this.itemSubject.value;
    items!.map(item => {
      return item.isActive = false;
    })
    const found = items!.find(ele => ele.id == id);
    found!.isActive = true;
    this.setCurrentItems(items!);
  }

  public returnCurrentItem(){
    const url = this.router.url;
    const items = this.itemSubject.value;
    var index = -1;
    items!.map(item => {
      if (item.path === url) return index = item.id;
      return item.isActive = false;
    })
    if (index > -1) items![index].isActive = true;
    this.setCurrentItems(items!);
  }
}

interface GetInformationResponse {
  information: Information,
  listCategoryOfMenu: Category[]
}

interface Item {
  id: number,
  name: string,
  path: string,
  isActive: boolean
}
