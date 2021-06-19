import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/@store';
import { ActivatedRoute, Router } from '@angular/router';
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
  _showProfileOption = false;
  path = '';
  constructor(
    private store: Store<AppState>,
    private router: Router,
    public activated: ActivatedRoute
  ) {
    this.getState = this.store.select(selectAccountState);
  }
  ngOnInit() {
    this.activated.url.subscribe((data: any) => {
      this.path = data[0].path;
      console.clear();
      console.log(data[0].path);
    });
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

    document.addEventListener('click', (evt) => {
      const flyoutElement = document.getElementsByClassName(
        'header__right-profile'
      )[0];
      let targetElement: any = evt.target;

      do {
        if (targetElement == flyoutElement) {
          this._showProfileOption = true;
          return;
        }
        targetElement = targetElement.parentNode;
      } while (targetElement);
      this._showProfileOption = false;
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
    } else if (this.router.url.includes('/my-profile')) {
      return 'step 5';
    }
  }
  getSubMenuItem(): string {
    if (this.router.url.includes('/manage/config/domaine')) {
      return 'step 1';
    } else if (this.router.url.includes('/manage/config/frontal')) {
      return 'step 2';
    } else if (this.router.url.includes('/manage/config/WhiteList')) {
      return 'step 3';
    } else if (this.router.url.includes('/manage/config/roles')) {
      return 'step 4';
    }
  }
  openUserOption() {}
  goTo() {
    this.router.navigate(['/my-profile']);
  }
}
