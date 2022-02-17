import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Chapter } from '../_models/chapter';
import { Story } from '../_models/story';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  public getStoryList(form: FormData): Observable<GetStoryResponse> {
    return this.httpClient.post<GetStoryResponse>(`${this.baseUrl}quan-tri/truyen/danh-sach`, form);
  }

  public getStoryById(id: number): Observable<GetStoryResponseById> {
    return this.httpClient.get<GetStoryResponseById>(`${this.baseUrl}truyen-home/${id}`);
  }

  public checkGetStoryById(id: number): Observable<CheckGetStoryResponseById> {
    return this.httpClient.get<CheckGetStoryResponseById>(`${this.baseUrl}tai-khoan/truyen/kiem-tra/${id}`);
  }


  public getStoryListByCatalog(pagenumber: number, catalog:string): Observable<GetStoryResponseByCatalog> {
    return this.httpClient.get<GetStoryResponseByCatalog>(`${this.baseUrl}danh-muc/${catalog}?pagenumber=${pagenumber}`);
  }

  public getStoryListByCategory(pagenumber: number, cid: string): Observable<GetStoryResponseByCategory> {
    return this.httpClient.get<GetStoryResponseByCategory>(`${this.baseUrl}the-loai/${cid}?pagenumber=${pagenumber}`);
  }

  public getAdminStory(id: number): Observable<Story> {
    return this.httpClient.get<Story>(`${this.baseUrl}quan-tri/truyen/sua-truyen/${id}`);
  }

  public getHomeStory(): Observable<GetHomeStoryResponse> {
    return this.httpClient.get<GetHomeStoryResponse>(`${this.baseUrl}trang-chu`);
  }

  public deleteStory(id: number): Observable<Story> {
    return this.httpClient.delete<Story>(`${this.baseUrl}quan-tri/truyen/xoa-truyen/${id}`);
  }

  public updateAdminStory(form: FormData, id: number): Observable<Story> {
    return this.httpClient.post<Story>(`${this.baseUrl}quan-tri/truyen/sua-truyen/${id}`, form);
  }

  public createStoryFormData(story: Story, images: File): FormData {
    const formData = new FormData();
    formData.append('name', story.name);
    formData.append('author', story.author);
    formData.append('infomation', story.infomation);
    if(story.categoryListInput != null)
      story.categoryListInput.forEach(tempCat => formData.append('category', tempCat));
    formData.append('price', JSON.stringify(story.price));
    formData.append('timeDeal', JSON.stringify(story.timeDeal));
    formData.append('dealStatus', JSON.stringify(Number(story.dealStatus)));
    formData.append('status', JSON.stringify(Number(story.status)));
    formData.append('images', images);
    return formData;
  }
}

interface GetStoryResponse {
  content: Story[],
  size: number,
  totalElements: number,
  totalPages: number,
  number: number
}

interface GetHomeStoryResponse {
  topStoryWeek: Story[];
  listNewStory: Story[];
  topStory: Story[];
  topVipStory: Story[];
}

interface GetStoryResponseByCatalog {
  topStoryMonth: Story[],
  listStoryPage: {
    content: Story[],
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetStoryResponseByCategory {
  listTopViewWeek: Story[],
  listTopAppointMonth: Story[],
  pageStory: {
    content: Story[],
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetStoryResponseById {
  storySummary: Story,
  countRating: number;
}

interface CheckGetStoryResponseById {
  readChapter: Chapter,
  checkConverter: boolean,
  rating: boolean,
}
