import { HttpClient, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RemiseDispoService {
  constructor(
    private http: HttpClient,
    @Inject('api_url') private api_url: string
  ) {}

  miseDisposition(obj: any) {
    return this.http.post(this.api_url + 'bal/remise-a-disposition', obj);
  }
}
