import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor() {}

  logOut() {
    // Delete token from localStorage
    // Update Account from the store
  }

  isAuthenticated(): boolean {
    return true;
    //Check if token is in localStorage
    //Is token valide (not expired)
  }
}
