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

  public getChapterUserByStoryId(sID: number, pagenumber: number, type: number): Observable<GetChapterUserResponse> {
    return this.httpClient.get<GetChapterUserResponse>(`${this.baseUrl}tai-khoan/chapter/chapter-nguoi-dung/?pagenumber=${pagenumber}&storyId=${sID}&type=${type}`);
  }

  public addChapter(sID: number, chapter: Chapter): Observable<Chapter> {
    return this.httpClient.post<Chapter>(`${this.baseUrl}tai-khoan/chapter/them/${sID}`,chapter);
  }

  buyChaperVip(form: FormData): Observable<CustomHttpResponse>{
    return this.httpClient.post<CustomHttpResponse>(`${this.baseUrl}tai-khoan/thanh-toan/mua-chapter-vip`, form);
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

interface GetChapterUserResponse {
  content: Chapter[],
  size: number,
  totalElements: number,
  totalPages: number,
  number: number
}

