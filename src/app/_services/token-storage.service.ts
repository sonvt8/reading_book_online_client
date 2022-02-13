import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  public token!: string;

  constructor() { }

  public saveToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  public loadToken(): void {
    this.token = localStorage.getItem('token')!;
  }

  public getToken(): string {
    return this.token;
  }

}
