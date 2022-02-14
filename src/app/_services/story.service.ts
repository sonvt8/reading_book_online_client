import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
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
