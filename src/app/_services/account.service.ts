import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccountOnHomePage } from '../_models/account-home-page';
import { Chapter } from '../_models/chapter';
import { CustomHttpResponse } from '../_models/custom-http-response';
import { Story } from '../_models/story';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl = environment.apiUrl;
  private accountSubject: BehaviorSubject<AccountOnHomePage | null>;
  public _account: Observable<AccountOnHomePage | null>;

  constructor(
    private httpClient: HttpClient
  ) {
    this.accountSubject = new BehaviorSubject<AccountOnHomePage | null>(null);
    this._account = this.getAccount();
  }

  public get accountValue(): AccountOnHomePage | null {
    return this.accountSubject.value;
  }

  public setCurrentAccount(account: AccountOnHomePage) {
    this.accountSubject.next(account);
  }

  public getAccount(): Observable<AccountOnHomePage> {
    return this.httpClient.get<AccountOnHomePage>(`${this.baseUrl}tai_khoan/`);
  }

  public updateNotification(words: string): Observable<User> {
    var formData: any = new FormData();
    formData.append("notification", words);
    return this.httpClient.post<User>(`${this.baseUrl}tai_khoan/doi_thong_bao`, formData);
  }

  public updateDisplayedName(words: string): Observable<User> {
    var formData: any = new FormData();
    formData.append("newNick", words);
    return this.httpClient.post<User>(`${this.baseUrl}tai_khoan/doi_ngoai_hieu`, formData);
  }

  public updateAvatar(form: FormData): Observable<User> {
    return this.httpClient.post<User>(`${this.baseUrl}tai_khoan/anh_dai_dien`, form);
  }

  public updatePassword(oldPassword: string, newPassword: string): Observable<CustomHttpResponse> {
    var formData: any = new FormData();
    formData.append("old-pass", oldPassword);
    formData.append("new-pass", newPassword);
    return this.httpClient.post<CustomHttpResponse>(`${this.baseUrl}tai_khoan/doi_mat_khau`, formData);
  }

  public getFollowStories(page: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}tai-khoan/theo-doi/danh-sach?pagenumber=${page}`);
  }

  public getPaymentHistory(page: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}tai-khoan/thanh-toan/danh-sach?pagenumber=${page}`);
  }

  public getStoryAccount(pagenumber: number, status:number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}tai-khoan/truyen/danh-sach?pagenumber=${pagenumber}&status=${status}`);
  }

  public addStory(form: FormData): Observable<Story> {
    return this.httpClient.post<Story>(`${this.baseUrl}tai-khoan/truyen/them-truyen`,form);
  }

  public updateStory(form: FormData, id: number): Observable<Story> {
    return this.httpClient.post<Story>(`${this.baseUrl}tai-khoan/truyen/sua-truyen/${id}`, form);
  }

  public deleteStory(id: number): Observable<CustomHttpResponse> {
    return this.httpClient.delete<CustomHttpResponse>(`${this.baseUrl}tai-khoan/truyen/xoa-truyen/${id}`);
  }

  public checkGetStoryById(id: number): Observable<CheckGetStoryResponseById> {
    return this.httpClient.get<CheckGetStoryResponseById>(`${this.baseUrl}tai-khoan/truyen/kiem-tra/${id}`);
  }
}

interface CheckGetStoryResponseById {
  readChapter: Chapter,
  checkConverter: boolean,
  rating: boolean,
}
