import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

const JWT_KEY = 'jw_token';
@Injectable()
export class AuthHelperService {
  constructor(private jwtHelperService: JwtHelperService) {}

  getJwt() {
    let jwt = window.sessionStorage.getItem(JWT_KEY);
    if (jwt == null) {
      jwt = window.localStorage.getItem(JWT_KEY);
    }

    return jwt;
  }

  isAuthorized(): boolean {
    return this.tokenNotExpired();
  }

  tokenNotExpired() {
    const token: string = this.getJwt();
    if (!token) {
      return false;
    }

    const tokenExpired: boolean = this.jwtHelperService.isTokenExpired(token);

    return !tokenExpired;
  }
}
