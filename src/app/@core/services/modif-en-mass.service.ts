import { HttpClient, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModifEnMassService {
  constructor(
    private http: HttpClient,
    @Inject('api_url') private api_url: string
  ) {}

  modifEnMass(obj: any) {
    return this.http.post(this.api_url + 'bal/modification-en-masse', obj);
  }
}
