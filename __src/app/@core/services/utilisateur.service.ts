import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BALState } from '__src/app/@shared/models/State';
import { Observable } from 'rxjs';
import { Frontal } from '__src/app/@shared/models/Frontal';

@Injectable({
  providedIn: 'root',
})
export class UtilisateurService {
  constructor(
    private http: HttpClient,
    @Inject('api_url') private api_url: string
  ) {}

  /*
   * This related to your api respond type ,plain Text is not valid json format,
   * by default HttpClient is expected json response type and try to parse it later .
   * You can solve this by set the respond type to text like this
   * */
  getGeneratedPWD(): Observable<string> {
    return this.http.get<string>(
      this.api_url + '/utilisateur/generation-motdepasse',
      { responseType: 'text' as 'json' }
    );
  }
}
