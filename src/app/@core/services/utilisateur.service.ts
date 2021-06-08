import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpinnerService } from '@core/services/spinner.service';
import { User } from '@shared/models/user';

@Injectable({
  providedIn: 'root',
})
export class UtilisateurService {
  constructor(
    private http: HttpClient,
    private spinnerService: SpinnerService,
    @Inject('api_url') private api_url: string
  ) {}

  /*
   * This related to your api respond type ,plain Text is not valid json format,
   * by default HttpClient is expected json response type and try to parse it later .
   * You can solve this by set the respond type to text like this
   * */
  getGeneratedPWD(silent: boolean): Observable<string> {
    this.spinnerService.silentApiCall = silent;
    return this.http.get<string>(
      this.api_url + '/utilisateur/generation-motdepasse',
      { responseType: 'text' as 'json' }
    );
  }

  getListUsers(): Observable<User[]> {
    return this.http.get<User[]>(
      this.api_url + 'utilisateur/liste-utilisateurs'
    );
  }
}
