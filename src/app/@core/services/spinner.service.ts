import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private httpCallNbr = 0;
  private spinner$ = new BehaviorSubject<string>('');
  private _silentApiCall = false;

  constructor() {}

  getSpinnerObserver(): Observable<string> {
    return this.spinner$.asObservable();
  }

  requestStarted() {
    if (this._silentApiCall === false && ++this.httpCallNbr === 1) {
      this.spinner$.next('start');
    }
  }

  requestEnded() {
    if (this.httpCallNbr === 0 || --this.httpCallNbr === 0) {
      //setTimeout(() => {
      this.spinner$.next('stop');
      //}, 500);
    }
    this.silentApiCall = false;
  }

  resetSpinner() {
    this.httpCallNbr = 0;
    this.spinner$.next('stop');
  }

  set silentApiCall(value: boolean) {
    this._silentApiCall = value;
  }
}
