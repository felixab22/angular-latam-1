import {Injectable} from '@angular/core';
import {CanActivate, Router, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {GoogleAuthenticationService} from '../../../core/login/google-authentication.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(public auth: GoogleAuthenticationService, public router: Router) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.auth.isAuthorized) {
      return true
    }
    this.router.navigate(['/login']);
    return false
  }

  isLogged() {
    if(this.auth.isAuthorized) {
      this.router.navigate(['/pages/dashboard']);
      return true
    }
    this.router.navigate(['/login']);
    return false
  }

  isLoggedExpired() {
    if(this.auth.isAuthorized) {
      this.router.navigate(['/pages/dashboard']);
      return true
    }
    this.router.navigate(['/login']);
    return false
  }
}
