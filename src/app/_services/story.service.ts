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
}

interface GetStoryResponse {
  content: Story[],
  size: number,
  totalElements: number,
  totalPages: number,
  number: number
}
