import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Chapter } from '../_models/chapter';
import { CustomHttpResponse } from '../_models/custom-http-response';

@Injectable({
  providedIn: 'root'
})
export class ChapterService {

  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  public getChapterListOfStory(id: number, pagenumber: number, type: number): Observable<GetChapterResponse> {
    return this.httpClient.get<GetChapterResponse>(`${this.baseUrl}truyen-home/${id}/chuong-cua-truyen?pagenumber=${pagenumber}&type=${type}`);
  }

  public getAccountChapterByStoryIdAndChapterId(sID: number, chID: number): Observable<GetChapterByStoryIdResponse> {
    return this.httpClient.get<GetChapterByStoryIdResponse>(`${this.baseUrl}tai-khoan/chapter/${sID}/${chID}`);
  }

  public getChapterByStoryIdAndChapterId(sID: number, chID: number): Observable<GetChapterByStoryIdResponse> {
    return this.httpClient.get<GetChapterByStoryIdResponse>(`${this.baseUrl}chuong/${sID}/chuong-${chID}`);
  }

  public addChapter(sID: number, chapter: Chapter): Observable<Chapter> {
    return this.httpClient.post<Chapter>(`${this.baseUrl}tai-khoan/chapter/them/${sID}`,chapter);
  }

  buyChaperVip(form: FormData): Observable<CustomHttpResponse>{
    return this.httpClient.post<CustomHttpResponse>(`${this.baseUrl}tai-khoan/thanh-toan/mua-chuong-vip`, form);
  }
}

interface GetChapterResponse {
  content: Chapter[],
  size: number,
  totalElements: number,
  totalPages: number,
  number: number
}

interface GetChapterByStoryIdResponse {
  chapter: Chapter,
  preChapter: number;
  nextChapter: number;
  checkVip: boolean;
}

