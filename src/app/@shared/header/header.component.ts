import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/@store';
import { Router } from '@angular/router';
import { selectAccountState } from 'src/app/@store/selectors';
import { Observable } from 'rxjs';
import { Role, UserAccount } from 'src/app/@shared';
import * as authAction from 'src/app/@store/actions/account.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  getState: Observable<any>;
  showSubMenu = false;
  isRoleAdmin = false;
  SubMenuClick = false;
  User: UserAccount = {
    firstName: 'mostafa',
    lastName: 'bouzaini',
    roles: [Role.SuperAdmin],
  };

  constructor(private store: Store<AppState>, private router: Router) {
    this.getState = this.store.select(selectAccountState);
  }
  ngOnInit() {
    // we save user in store with resolver manage in /services/manageResolver
    // this.store.dispatch(new authAction.SetUserAccountSuccess(this.User));
    this.getState.subscribe((state) => {
      if (state.roles.indexOf('SuperAdmin') !== -1) {
        this.isRoleAdmin = true;
      } else if (state.roles.indexOf('Admin') !== -1) {
        this.isRoleAdmin = true;
      } else {
        this.isRoleAdmin = false;
      }
    });
  }
  openSubMenu() {
    this.showSubMenu = !this.showSubMenu;
  }

  /* for border inder item of header */
  getPathMenu(): string {
    if (this.router.url.includes('/mailBox/main')) {
      return 'step 1';
    } else if (this.router.url.includes('/mailBox-reply')) {
      return 'step 2';
    } else if (this.router.url.includes('/listeIdentifiantsUtilisateurs')) {
      return 'step 3';
    } else if (this.router.url.includes('/config')) {
      return 'step 4';
    }
  }
  getSubMenuItem(): string {
    if (this.router.url.includes('/manage/config/domaine')) {
      return 'step 1';
    } else if (this.router.url.includes('/manage/config/Frontal')) {
      return 'step 2';
    } else if (this.router.url.includes('/manage/config/WhiteList')) {
      return 'step 3';
    } else if (this.router.url.includes('/manage/config/roles')) {
      return 'step 4';
    }
  }
}
