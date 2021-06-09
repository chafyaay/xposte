import { HttpClient, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DesactiverEnMassService {
  constructor(
    private http: HttpClient,
    @Inject('api_url') private api_url: string
  ) {}

  desactiver(obj: any) {
    return this.http.post(this.api_url + 'bal/desactivation-en-masse', obj);
  }
}

