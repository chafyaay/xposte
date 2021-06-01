import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthNotAuthorizedInterceptor implements HttpInterceptor {
  constructor() {}

  addBackendToken(req: HttpRequest<any>): HttpRequest<any> {
    let UserAuth = localStorage.getItem('AuthToken');

    req = req.clone({
      setHeaders: {
        Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0IiwiaWF0IjoxNjE5Nzk0NTY1LCJleHAiOjEzMTIxOTc5ODE2NX0.v34Dcm2-r9anIUKPqdR0hbY0qdMlpK4ZgbLtfRJwlrGSvuG78nNpKH9cCTsCWiiJtnO2G4HUKeXNorlZE5aTuw`,
      },
    });
    return req;
  }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let newRequest = this.addBackendToken(req);

    return next.handle(newRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }
}
