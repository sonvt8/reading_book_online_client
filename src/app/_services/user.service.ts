import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  public getAdminUserList(form: FormData): Observable<GetAdminUserResponse> {
    return this.httpClient.post<GetAdminUserResponse>(`${this.baseUrl}quan_tri/nguoi_dung/danh-sach`, form);
  }

  public updateAdminUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.baseUrl}quan_tri/nguoi_dung/cap_nhat`, user);
  }
}

interface GetAdminUserResponse {
  content: User[],
  size: number,
  totalElements: number,
  totalPages: number,
  number: number
}
