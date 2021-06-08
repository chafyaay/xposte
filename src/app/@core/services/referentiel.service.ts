import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BALState } from 'src/app/@shared/models/State';
import { Observable } from 'rxjs';
import { Frontal } from 'src/app/@shared/models/Frontal';

@Injectable({
  providedIn: 'root',
})
export class ReferentielService {
  constructor(
    private http: HttpClient,
    @Inject('api_url') private api_url: string
  ) {}

  getFrontal(): Observable<Frontal[]> {
    return this.http.get<Frontal[]>(this.api_url + '/frontal/liste');
  }

  getState(): Observable<BALState[]> {
    return this.http.get<BALState[]>(this.api_url + '/bal/liste-etats-bal');
  }
}
