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
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user') as string));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  public setCurrentUser(user: User) {
    this.userSubject.next(user);
  }

  public register(user: UserRegister): Observable<User> {
    return this.httpClient.post(`${this.baseUrl}thanh_vien/dang_ky`, user).pipe(
      map((response: any) => {
        console.log(response);
        return response;
      })
    );
  }

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
}

interface GetAdminUserResponse {
  content: User[],
  size: number,
  totalElements: number,
  totalPages: number,
  number: number
}

interface UserRegister {
  username: string;
  email: string;
}
