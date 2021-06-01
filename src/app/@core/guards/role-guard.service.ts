import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Logger } from 'src/app/@core';
import { Role } from 'src/app/@shared';

const log = new Logger('RoleGuard');

@Injectable({ providedIn: 'root' })
export class RoleGuardService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const roles = route.data.roles as Array<string>;
    // read account user roles from the store
    // in second condition: verify that one of the roles passed in route existe for the current user
    if (roles && roles.indexOf('SuperAdmin') !== -1) {
      return true;
    }

    // Does not own the right role
    this.router.navigate(['/mailBox/main']);
    return false;
  }
}
