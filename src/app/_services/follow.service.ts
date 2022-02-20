import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomHttpResponse } from '../_models/custom-http-response';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  public checkFollow(form: FormData): Observable<boolean> {
    return this.httpClient.post<boolean>(`${this.baseUrl}theo-doi/kiem-tra`, form);
  }

  public addFollowStory(form: FormData): Observable<CustomHttpResponse> {
    return this.httpClient.post<CustomHttpResponse>(`${this.baseUrl}theo-doi/them`, form);
  }

  public cancelFollowStory(form: FormData): Observable<CustomHttpResponse> {
    return this.httpClient.post<CustomHttpResponse>(`${this.baseUrl}theo-doi/huy`, form);
  }
}
