import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiUrl;
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;
  private loggedInUsername!: string;
  private token!: string;
  private jwtHelper = new JwtHelperService();

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) {
    this.userSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('user') as string));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User | null {
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

  public getUserFromLocalCache(): User {
    return JSON.parse(localStorage.getItem('user')!);
  }

  public loadToken(): void {
    this.token = localStorage.getItem('token')!;
  }

  public getToken(): string {
    return this.token;
  }

  public isLoggedIn(): boolean {
    this.loadToken();
    if (this.token != null && this.token !== ''){
      if (this.jwtHelper.decodeToken(this.token).sub != null || '') {//get Username
        if (!this.jwtHelper.isTokenExpired(this.token)) {
          this.loggedInUsername = this.jwtHelper.decodeToken(this.token).sub;
          return true;
        }
      }
    } else {
      this.logOut();
      return false;
    }
    return false;
  }

  public login(user: UserLogin): Observable<HttpResponse<User>> {
    return this.httpClient.post<User>(`${this.baseUrl}thanh_vien/dang_nhap`, user, { observe: 'response' });
  }

  public logOut(): void {
    this.token = '';
    this.loggedInUsername = '';
    this.userSubject.next(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    // localStorage.removeItem('users');
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

