import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(
    private http: HttpClient,
    @Inject('api_url') private api_url: string
  ) { }

  getProfileDetails():Observable<any>{
    return this.http.get(this.api_url + '/utilisateur/infos');
  }
  updateProfile(profile){
    return this.http.post(this.api_url + '/utilisateur/modification',profile);

  }
}

