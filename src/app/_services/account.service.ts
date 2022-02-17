import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomHttpResponse } from '../_models/custom-http-response';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl = environment.apiUrl;

  constructor(
    private httpClient: HttpClient
  ) {}

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

  public updatePassword(oldPassword: string, newPassword: string): Observable<CustomHttpResponse> {
    var formData: any = new FormData();
    formData.append("old-pass", oldPassword);
    formData.append("new-pass", newPassword);
    return this.httpClient.post<CustomHttpResponse>(`${this.baseUrl}tai_khoan/doi_mat_khau`, formData);
  }
}
