import {Injectable} from '@angular/core';
import {SocialAuthService, SocialUser} from 'angularx-social-login';

@Injectable()
export class GoogleAuthenticationService {
  user = new SocialUser();
  loggedIn: boolean;
  constructor(private authService: SocialAuthService) {
    this.Ingresar();
  }
  Ingresar(): void {
    this.loggedIn = false;
    this.authService.authState.subscribe((user: SocialUser) => {
      this.user = user;
      this.loggedIn = user != null;
    });
  }
  get isAuthorized() {
    return this.loggedIn;
  }
  get getSocialUser(): SocialUser {
    return this.user;
  }
}
