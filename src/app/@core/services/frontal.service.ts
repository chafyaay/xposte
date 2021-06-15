import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { FrontalFilter } from '@shared';
import { Frontal } from '@shared/models/Frontal';

const httpOptions = {
  observe: 'response' as 'body',
};
@Injectable({
  providedIn: 'root',
})
export class FrontalService {
  constructor(
    private http: HttpClient,
    @Inject('api_url') private api_url: string
  ) {}

  searchFrontals(frontal: FrontalFilter): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(
      `${this.api_url}frontal/recherche`,
      frontal,
      httpOptions
    );
  }

  createfrontal(frontal: Frontal): Observable<any> {
    return this.http.post<any>(this.api_url + `frontal/creation`, frontal);
  }
  deleteFrontal(id: string): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(
      `${this.api_url}frontal/suppression`,
      httpOptions
    );
  }
  updatefrontal(frontal: Frontal): Observable<any> {
    return this.http.post<any>(this.api_url + `frontal/modification`, frontal);
  }
}
