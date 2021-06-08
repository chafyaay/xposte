import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { SpinnerService } from '@core/services/spinner.service';

@Injectable({
  providedIn: 'root',
})
export class AuthNotAuthorizedInterceptor implements HttpInterceptor {
  constructor(private spinnerService: SpinnerService) {}

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

    this.spinnerService.requestStarted();
    return next.handle(newRequest).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse) {
            this.spinnerService.requestEnded();
          }
        },
        (error: HttpErrorResponse) => {
          this.spinnerService.requestEnded();
          return throwError(error);
        }
      )
    );
  }
}
