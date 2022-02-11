import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Role } from '../_models/role';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiUrl;
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  private token!: string;

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
        return response;
      })
    );
  }

  public saveToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  public addUserToLocalCache(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public loadToken(): void {
    this.token = localStorage.getItem('token')!;
  }

  public getToken(): string {
    return this.token;
  }

  public login(user: UserLogin): Observable<HttpResponse<User>> {
    return this.httpClient.post<User>(`${this.baseUrl}thanh_vien/dang_nhap`, user, { observe: 'response' });
  }
}

interface UserRegister {
  username: string;
  email: string;
}

interface UserLogin {
  username: string;
  password: string;
}

