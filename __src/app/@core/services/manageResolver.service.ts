import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '__src/app/@store';
import * as authActions from '__src/app/@store/actions/account.action';
import { Role, UserAccount } from '__src/app/@shared';
@Injectable()
export class ManageResolverService implements Resolve<any[]> {
  User: UserAccount = {
    id: '1',
    firstName: 'Mostafa',
    lastName: 'Bouziani',
    roles: [Role.SuperAdmin],
  };
  constructor(private store: Store<AppState>) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any[]> | any {
    this.store.dispatch(new authActions.SetUserAccountSuccess(this.User));
    return of(null);
  }
}
