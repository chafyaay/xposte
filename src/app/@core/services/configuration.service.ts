import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BALState } from '@shared/models/State';
import { Observable } from 'rxjs';
import { Frontal } from '@shared/models/Frontal';
import { WhiteListFilter } from '@shared/models/WhiteListFilter';
import { WhiteListHost } from '@shared/models/WhiteListHost';

const httpOptions = {
  observe: 'response' as 'body',
};
@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  constructor(
    private http: HttpClient,
    @Inject('api_url') private api_url: string
  ) {}

  getWhiteListHosts(
    whiteListFilter: WhiteListFilter
  ): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(
      this.api_url + 'whitelist/recherche',
      whiteListFilter,
      httpOptions
    );
  }

  deleteWhitelistHost(
    whiteListHost: WhiteListHost
  ): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(
      this.api_url + 'whitelist/suppression',
      whiteListHost,
      httpOptions
    );
  }

  createWhitelistHost(
    whiteListHost: WhiteListHost
  ): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(
      this.api_url + 'whitelist/ajout',
      whiteListHost,
      httpOptions
    );
  }
}
