import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  public checkFollow(form: FormData): Observable<boolean> {
    return this.httpClient.post<boolean>(`${this.baseUrl}theo-doi/kiem-tra`, form);
  }
}
