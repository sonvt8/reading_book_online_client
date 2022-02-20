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
    return this.httpClient.get<GetCategoryResponse>(`${this.baseUrl}quan-tri/the_loai/danh-sach?keyword=${theKeyword}&pagenumber=${thePage}`);
  }

  public getCategoryListNoPagination(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.baseUrl}quan-tri/the_loai/danh-sach-khong-phan-trang`);
  }

  public addCategory(name: string): Observable<Category> {
    return this.httpClient.post<Category>(`${this.baseUrl}quan-tri/the_loai/them`, name);
  }

  public getCategoryAdminById(id: number): Observable<Category> {
    return this.httpClient.get<Category>(`${this.baseUrl}quan-tri/the_loai/cap-nhat/${id}`);
  }

  public getCategoryById(id: number): Observable<Category> {
    return this.httpClient.get<Category>(`${this.baseUrl}the-loai/${id}`);
  }

  public updateCategory(category: Category): Observable<Category> {
    return this.httpClient.post<Category>(`${this.baseUrl}quan-tri/the_loai/cap-nhat/${category.id}`, category);
  }

  public deleteCategory(id: number): Observable<Category> {
    return this.httpClient.delete<Category>(`${this.baseUrl}quan-tri/the_loai/xoa/${id}`);
  }

  public getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.baseUrl}the-loai/danh-sach`);
  }
}

interface GetCategoryResponse {
  content: Category[],
  size: number,
  totalElements: number,
  totalPages: number,
  number: number
}