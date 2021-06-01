import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RemiseDispoService {
  api_url = environment.api_url;
  constructor(private http: HttpClient) {}

  miseDisposition(obj: any) {
    return this.http.post(this.api_url + 'bal/remise-a-disposition', obj);
  }
}
