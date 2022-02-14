import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl = environment.apiUrl;

  constructor(
    private httpClient: HttpClient
  ) {}

  public updateNotification(word: string): Observable<User> {
    var formData: any = new FormData();
    formData.append("notification", word);
    return this.httpClient.post<User>(`${this.baseUrl}tai_khoan/doi_thong_bao`, formData);
  }
}
