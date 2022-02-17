import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Chapter } from '../_models/chapter';

@Injectable({
  providedIn: 'root'
})
export class ChapterService {

  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  public getChapterListOfStory(id: number, pagenumber: number, type: number): Observable<GetChapterResponse> {
    return this.httpClient.get<GetChapterResponse>(`${this.baseUrl}truyen-home/${id}/chuong-cua-truyen?pagenumber=${pagenumber}&type=${type}`);
  }
}

interface GetChapterResponse {
  content: Chapter[],
  size: number,
  totalElements: number,
  totalPages: number,
  number: number
}