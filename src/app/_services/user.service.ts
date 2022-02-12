import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Role } from '../_models/role';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.apiUrl;

  constructor(
    private httpClient: HttpClient
  ) {}

  public getAdminUserList(form: FormData): Observable<GetAdminUserResponse> {
    return this.httpClient.post<GetAdminUserResponse>(`${this.baseUrl}quan_tri/nguoi_dung/danh-sach`, form);
  }

  // public updateAdminUser(form: FormData, id: number): Observable<User> {
  //   return this.httpClient.post<User>(`${this.baseUrl}quan_tri/nguoi_dung/cap_nhat/${id}`, form);
  // }

  public updateAdminUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.baseUrl}quan_tri/nguoi_dung/cap_nhat/${user.id}`, user);
  }

  public getAdminUser(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}quan_tri/nguoi_dung/cap_nhat/${id}`);
  }

  public getListRoles(): Observable<Role[]> {
    return this.httpClient.get<Role[]>(`${this.baseUrl}quan_tri/nguoi_dung/phan_quyen`);
  }

  public deleteAdminUser(user: User): Observable<User> {
    return this.httpClient.delete<User>(`${this.baseUrl}quan_tri/nguoi_dung/xoa/${user.id}`);
  }

  public payDrawAdminUser(form: FormData): Observable<User> {
    return this.httpClient.post<User>(`${this.baseUrl}quan_tri/nguoi_dung/nap_dau`, form);
  }
}

interface GetAdminUserResponse {
  content: User[],
  size: number,
  totalElements: number,
  totalPages: number,
  number: number
}