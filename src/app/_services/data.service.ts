import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../_models/category';
import { Information } from '../_models/information';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = environment.apiUrl;
  private itemSubject: BehaviorSubject<Item[] | null>;
  public _items: Observable<Item[] | null>;

  constructor(private httpClient: HttpClient) { 
    this.itemSubject = new BehaviorSubject<Item[] | null>(
      [
        {name: 'Hồ sơ',path: '/tai_khoan',isActive: true},
        {name: 'Truyện Theo Dõi',path: '/tai_khoan/theo_doi',isActive: false},
        {name: 'Đổi Mật Khẩu',path: '/tai_khoan/doi_mat_khau',isActive: false},
        {name: 'Nạp Đậu',path: '/tai_khoan/nap_dau',isActive: false},
        {name: 'Log Giao Dịch',path: '/tai_khoan/giao_dich',isActive: false},
        {name: 'Rút Tiền ==> Dành cho mod và converter',path: '/tai_khoan/rut_tien',isActive: false},
        {name: 'Đăng Truyện',path: '/tai_khoan/them_truyen',isActive: false},
        {name: 'Quản lý Truyện',path: '/tai_khoan/quan_ly_truyen',isActive: false}
      ]
    );
    this._items = this.itemSubject.asObservable(); 
  }

  public getData(): Observable<GetInformationResponse> {
    return this.httpClient.get<GetInformationResponse>(`${this.baseUrl}thong-tin`);
  }

  public get itemValue(): Item[] | null {
    return this.itemSubject.value;
  }

  public setCurrentItems(items: Item[]) {
    this.itemSubject.next(items);
  }

  public updateStatus(index: number){
    const items = this.itemSubject.value;
    items!.map(item => {
      return item.isActive = false;
    })
    items![index].isActive = true;
    this.setCurrentItems(items!);
  }
}

interface GetInformationResponse {
  information: Information,
  listCategoryOfMenu: Category[]
}

interface Item {
  name: string,
  path: string,
  isActive: boolean
}
