import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../_models/category';
import { Information } from '../_models/information';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  public getData(): Observable<GetInformationResponse> {
    return this.httpClient.get<GetInformationResponse>(`${this.baseUrl}thong-tin`);
  }
}

interface GetInformationResponse {
  information: Information,
  listCategoryOfMenu: Category[]
}
