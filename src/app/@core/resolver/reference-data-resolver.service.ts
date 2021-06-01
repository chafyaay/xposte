import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/@store';
import * as authActions from 'src/app/@store/actions/account.action';
import { Role, UserAccount } from 'src/app/@shared';
import { HttpClient } from '@angular/common/http';
import { Frontal } from 'src/app/@shared/models/Frontal';
import { SetFrontal } from 'src/app/@store/actions/frontal.action';
import { BALState } from 'src/app/@shared/models/State';
import { SetBALState } from 'src/app/@store/actions/bal-state.action';
import { ReferentielService } from 'src/app/@core/services/referentiel.service';

@Injectable()
export class ReferenceDataResolverService implements Resolve<any[]> {
  constructor(
    private store: Store<AppState>,
    private http: HttpClient,
    private ReferentielService: ReferentielService
  ) {}

  resolve(): Observable<any> {
    this.ReferentielService.getFrontal().subscribe(
      (resp) => {
        this.store.dispatch(new SetFrontal(resp));
      },
      (error) => {
        // FAILED
        this.store.dispatch(new SetFrontal([]));
      }
    );

    // calling the  API  here  instead of this line when the  API is ready
    this.ReferentielService.getState().subscribe(
      (resp) => {
        this.store.dispatch(new SetBALState(resp));
      },
      (error) => {
        // FAILED
        this.store.dispatch(new SetBALState([]));
      }
    );

    return of(null);
  }
}
