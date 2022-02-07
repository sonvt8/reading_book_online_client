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

  public getAdminUserList(search: string, type: number, pagenumber: number): Observable<GetAdminUserResponse> {
    return this.httpClient.get<GetAdminUserResponse>(`${this.baseUrl}quan_tri/nguoi_dung/danh-sach?search=${search}&type=${type}&pagenumber=${pagenumber}`);
  }
}

interface GetAdminUserResponse {
  content: User[],
  size: number,
  totalElements: number,
  totalPages: number,
  number: number
}
