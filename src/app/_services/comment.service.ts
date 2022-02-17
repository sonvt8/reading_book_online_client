import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommentModel } from '../_models/comment-model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  public getCommentList(form: FormData): Observable<GetCommentResponse> {
    return this.httpClient.post<GetCommentResponse>(`${this.baseUrl}thanh_vien/binh-luan/xem`, form);
  }

  public addComment(form: FormData): Observable<GetCommentResponse> {
    return this.httpClient.post<GetCommentResponse>(`${this.baseUrl}tai_khoan/binh_luan/them`, form);
  }
}

interface GetCommentResponse {
  content: CommentModel[],
  size: number,
  totalElements: number,
  totalPages: number,
  number: number
}

