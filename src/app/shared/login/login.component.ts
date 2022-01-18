import { Component } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService } from "angularx-social-login";
import { Router } from '@angular/router';
import {RouterExtService} from "../../core/router/router-ext.service";
import {GoogleAuthenticationService} from "../../core/login/google-authentication.service";
import {JwtHelperService} from '@auth0/angular-jwt';
import {OauthService} from 'src/app/core/oauth/oauth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isError = false;
  loggedIn: boolean;
  errorLogin: boolean;
  helper = new JwtHelperService();

  constructor(private googleAuthenticationService: GoogleAuthenticationService,
              private authService: SocialAuthService,
              private router: Router,
              private _oauthService: OauthService,
              private routerExtService: RouterExtService) {}
  ngAfterViewInit() {
    if (this.googleAuthenticationService.isAuthorized) {
      let previous = this.routerExtService.getPreviousUrl();
      if(previous == "/") {
        previous = '/pages/dashboard'
      }
      this.router.navigate([previous]);
    }else {
      localStorage.clear();
    }
  }

  signInWithGoogle(){
    this.authService.initState.subscribe(value => {
        console.log("value --> ", value)
        if (!this.loggedIn) {
          this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(user => {
            console.log("user --> ", user)

                // this._oauthService.aoutUser(user.idToken).subscribe( data => {
                //   console.log("data --> ", data)
                  this.isError = false;
                  localStorage.setItem('roles', 'admin');
                  localStorage.setItem('user', JSON.stringify(user));
                  localStorage.setItem('token', user.idToken);
                  this.router.navigate(['/pages/dashboard']);
              // })

          }).catch(err => this.errorLogin = true);
        } else {
          this.isError = true;
        }
    })
  }
}
