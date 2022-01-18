import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {SocialAuthService, SocialUser} from 'angularx-social-login';
import {Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {LoginComponent} from './login.component';
import {RouterExtService} from 'src/app/core/router/router-ext.service';
import {GoogleAuthenticationService} from "../../core/login/google-authentication.service";
import {OauthService} from "../../core/oauth/oauth.service";
import {JwtHelperService} from "@auth0/angular-jwt";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let socialAuthService: SocialAuthService;
  let googleAuthenticationService: GoogleAuthenticationService;
  let googleAuthenticationServiceSpy: {isAuthorized: boolean};
  let socialAuthtSpy: { authState: Observable<SocialUser>, initState:Observable<boolean> ; }
  let previous: String;
  let router: Router;
  let routerExtService: RouterExtService;
  let oauthService : OauthService
  let jwtHelperService : JwtHelperService

  const socialUserMock = <SocialUser> {
    "provider": "string",
    "id": "string",
    "email": "prueba@latam.com",
    "name": "string",
    "photoUrl": "string",
    "firstName": "string",
    "lastName": "string",
    "authToken": "string",
    "idToken": "string",
    "authorizationCode": "string",
    "response": "string"
  }

  beforeEach((() => {
    socialAuthtSpy = jasmine.createSpyObj('SocialAuthService', ['authState','signIn','initState', 'subscribe']);
    googleAuthenticationServiceSpy = jasmine.createSpyObj('GoogleAuthenticationService', ['isAuthorized','getSocialUser']);
    router = jasmine.createSpyObj('Router', ['navigate'])

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [LoginComponent],
      providers: [
        { provide: SocialAuthService, useValue: socialAuthtSpy },
        { provide: GoogleAuthenticationService, useValue: googleAuthenticationServiceSpy },
        { provide: Router, useValue: router },
        { provide: OauthService, useValue: oauthService },
        { provide: JwtHelperService, useValue: jwtHelperService },
        { provide: RouterExtService, useClass: RouterExtService },
      ]
    }).compileComponents()

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    googleAuthenticationService = TestBed.inject(GoogleAuthenticationService);
    component = fixture.componentInstance;
    socialAuthtSpy.authState = new Observable<SocialUser>();
    socialAuthtSpy.initState = new Observable<boolean>();
    routerExtService = TestBed.inject(RouterExtService)
    fixture.detectChanges();
  });


  it('should be valid isLogged', () => {
    socialAuthtSpy.authState = of(socialUserMock)
    socialAuthtSpy.initState = of(true)
    googleAuthenticationServiceSpy.isAuthorized = true
    component.loggedIn = true;
    const spy = spyOn(routerExtService,'getPreviousUrl').and.returnValue('/')
    component.signInWithGoogle();
    component.ngAfterViewInit();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled
    });

    it('should be valid isLogged and listFlight', () => {

      socialAuthtSpy.authState = of(socialUserMock)
      socialAuthtSpy.initState = of(true)
      googleAuthenticationServiceSpy.isAuthorized = true
      component.loggedIn = true;
      const spy = spyOn(routerExtService,'getPreviousUrl').and.returnValue('/pages/dashboard')
      component.signInWithGoogle();
      component.ngAfterViewInit();
      fixture.detectChanges();
      expect(spy).toHaveBeenCalled

      });

      it('should be valid ngAfterViewInit and listFlight', () => {
        googleAuthenticationServiceSpy.isAuthorized = false
        const spy = spyOn(routerExtService,'getPreviousUrl').and.returnValue('/pages/dashboard')
        component.ngAfterViewInit();
        fixture.detectChanges();
        expect(spy).toHaveBeenCalled
        });
        it('should be valid ngAfterViewInit and listFlight', () => {
          googleAuthenticationServiceSpy.isAuthorized = false
          const spy = spyOn(routerExtService,'getPreviousUrl').and.returnValue('/')
          component.ngAfterViewInit();
          fixture.detectChanges();
          expect(spy).toHaveBeenCalled
          });



});
