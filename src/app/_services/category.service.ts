import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../_models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  public getCategoryList(thePage: number, theKeyword: string): Observable<GetCategoryResponse> {
    return this.httpClient.get<GetCategoryResponse>(`${this.baseUrl}quan-tri/the-loai/danh-sach?keyword=${theKeyword}&pagenumber=${thePage}`);
  }

  public addCategory(name: string): Observable<Category> {
    return this.httpClient.post<Category>(`${this.baseUrl}quan-tri/the-loai/them`, name);
  }

  
}

interface GetCategoryResponse {
  content: Category[],
  size: number,
  totalElements: number,
  totalPages: number,
  number: number
}