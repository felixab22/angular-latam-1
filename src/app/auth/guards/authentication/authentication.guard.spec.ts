import {TestBed} from '@angular/core/testing';

import {AuthenticationGuard} from './authentication.guard';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';
import {SocialAuthService} from 'angularx-social-login';
import {GoogleAuthenticationService} from 'src/app/core/login/google-authentication.service';


describe('AuthenticationGuard', () => {
  let authenticationGuard: AuthenticationGuard;
  let socialAuthtSpy: { authState: jasmine.Spy };
  let googleAuthenticationServiceSpy: {isAuthorized: boolean};
  let router = {
    navigate: jasmine.createSpy('navigate')
  }
  beforeEach(() => {
    socialAuthtSpy = jasmine.createSpyObj('SocialAuthService', ['authState']);
    googleAuthenticationServiceSpy = jasmine.createSpyObj('GoogleAuthenticationService',
      ['isAuthorized','getSocialUser']);

    TestBed.configureTestingModule({
      providers: [AuthenticationGuard,
        {provide: Router, useValue: router},
        {provide: GoogleAuthenticationService, useValue: googleAuthenticationServiceSpy},
        {provide: SocialAuthService, useValue: socialAuthtSpy}],
      imports: [HttpClientTestingModule, RouterTestingModule]
    });
    authenticationGuard = TestBed.inject(AuthenticationGuard);
  });

  it('AuthenticationGuard instanced', () => {
    expect(authenticationGuard).toBeTruthy();
  });

  it('isLogged Authorized', () => {
    expect(authenticationGuard.isLogged()).toEqual(true);
  })

  it('isLogged Not Authorized', () => {
    googleAuthenticationServiceSpy.isAuthorized = false;
    expect(authenticationGuard.isLogged()).toEqual(false);
  })

  it('isLoggedExpired Authorized', () => {
    expect(authenticationGuard.isLoggedExpired()).toEqual(true);
  })

  it('isLoggedExpired Not Authorized', () => {
    googleAuthenticationServiceSpy.isAuthorized = false;
    expect(authenticationGuard.isLoggedExpired()).toEqual(false);
  })

  it('not be able to hit route when user is not logged in', () => {
    googleAuthenticationServiceSpy.isAuthorized = false;
    expect(authenticationGuard.canActivate()).toBe(false);
  });

  it('able to hit route when user is logged in', () => {
    googleAuthenticationServiceSpy.isAuthorized = true;
    expect(authenticationGuard.canActivate()).toBe(true);
  });

});
