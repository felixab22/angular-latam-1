import {inject, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {GoogleAuthenticationService} from './google-authentication.service';
import {Observable, of} from 'rxjs';
import {SocialAuthService, SocialUser} from "angularx-social-login";

xdescribe('GoogleAuthenticationService', () => {
  let service: GoogleAuthenticationService;
  let socialAuthtSpy: { authState: Observable<SocialUser>}
  const socialUserMock:SocialUser = 
    {
    id: "1",
    name: "Jhosef quijana martinez",
    email: "quijana20@gmail.com",
    photoUrl: "https://lh3.googleusercontent.com",
    firstName: "Jhosef", "lastName": "quijana martinez",
    authToken: "#token#",
    idToken: "#idtoken#",
    response: {
      token_type: "Bearer",
      access_token: "#token#",
      scope: "email profile https://www.googleapis.com/auth/userinfo.profile openid https://www.googleapis.com/auth/userinfo.email",
      login_hint: "#login_hint#",
      expires_in: 3598,
      id_token: "#idtoken#",
      session_state: {
        extraQueryParams: {
          authuser: "0"
        }
      },
      first_issued_at: 1637172825116,
      expires_at: 1637176423116,
      idpId: "google"
    },
    provider: "GOOGLE",
    authorizationCode: ''
  }
  
  beforeEach(() => {
    socialAuthtSpy = jasmine.createSpyObj('SocialAuthService', ['authState']);
      TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [GoogleAuthenticationService,
        {provide: SocialAuthService, useValue: socialAuthtSpy},
      ]
    })
    service = TestBed.inject(GoogleAuthenticationService);
  });

  it('GoogleAuthenticationService instanced', inject([GoogleAuthenticationService], (guard: GoogleAuthenticationService) => {
    expect(guard).toBeTruthy();
  }));

  it('is Authorized',()=>{
    socialAuthtSpy.authState = of(socialUserMock);
    service.Ingresar();
    expect(service.isAuthorized).toEqual(false);
    expect(service.getSocialUser).toEqual(socialUserMock);
  })


});
