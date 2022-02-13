import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../_models/user';
import { TokenStorageService } from './token-storage.service';
import { CustomHttpResponse } from '../_models/custom-http-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiUrl;
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;
  private loggedInUsername!: string;
  private jwtHelper = new JwtHelperService();

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private tokenService: TokenStorageService
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

  public addUserToLocalCache(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUserFromLocalCache(): User {
    return JSON.parse(localStorage.getItem('user')!);
  }

  public resetPassword(email: string): Observable<CustomHttpResponse> {
    var formData: any = new FormData();
    formData.append("email", email);
    return this.httpClient.post<CustomHttpResponse>(`${this.baseUrl}thanh_vien/quen_mat_khau`,formData);
  }

  public isLoggedIn(): boolean {
    this.tokenService.loadToken();
    if (this.tokenService.token != null && this.tokenService.token !== ''){
      if (this.jwtHelper.decodeToken(this.tokenService.token).sub != null || '') {//get Username
        if (!this.jwtHelper.isTokenExpired(this.tokenService.token)) {
          this.loggedInUsername = this.jwtHelper.decodeToken(this.tokenService.token).sub;
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
    this.tokenService.token = '';
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

