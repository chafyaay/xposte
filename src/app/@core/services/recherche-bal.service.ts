import { Inject, Injectable } from '@angular/core';
import { Recherche } from 'src/app/@shared/models/recherche';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BalTampoCriteria } from 'src/app/@shared/models/BalTampoCriteria';
import { BALData } from 'src/app/@shared/models/BALData';

const httpOptions = {
  observe: 'response' as 'body',
};
@Injectable({
  providedIn: 'root',
})
export class RechercheBalService {
  constructor(
    private http: HttpClient,
    @Inject('api_url') private api_url: string
  ) {}

  getBal(bal: Recherche): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(
      this.api_url + `bal/recherche`,
      bal,
      httpOptions
    );
  }

  createBal(bal: BALData): Observable<any> {
    return this.http.post<any>(this.api_url + `bal/creation`, bal);
  }

  updateBal(bal: BALData): Observable<any> {
    return this.http.post<any>(this.api_url + `bal/modification`, bal);
  }

  detamponner(bal: Recherche): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(
      this.api_url + `bal/detamponnage`,
      bal,
      httpOptions
    );
  }
  ToggleTamponner(bal: BalTampoCriteria): Observable<any> {
    return this.http.post<any>(this.api_url + `/bal/tamponnage`, bal);
  }
}
