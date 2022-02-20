import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Rating } from '../_models/rating';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  public ratingStory(form: FormData): Observable<Rating> {
    return this.httpClient.post<Rating>(`${this.baseUrl}tai_khoan/danh_gia`, form);
  }
}
