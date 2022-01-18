import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {TransferState} from '@angular/platform-browser';

import {HostInterceptor} from './host.interceptor';
import {HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import {ConfigService} from '../../core/config/config.service';
import {SocialAuthService, SocialUser} from 'angularx-social-login';
import {GoogleAuthenticationService} from "../../core/login/google-authentication.service";


export class GoogleAuthenticationServiceMock {
  get isAuthorized() {
    return true;
  }

  get getSocialUser() : SocialUser | null {
    return null;
  }
}


describe('HostInterceptor', () => {
  let service: HostInterceptor;
  let httpMock: HttpTestingController;
  let configService: ConfigService;
  let googleAuthenticationService: GoogleAuthenticationService;
  let httpClient: HttpClient;

  beforeEach(() => {
    configService = jasmine.createSpyObj("ConfigService", ["settings", "load"])

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        HostInterceptor,
        {provide: TransferState},
        {provide: SocialAuthService},
        {provide: ConfigService, useValue: configService},
        {provide: GoogleAuthenticationService, useClass: GoogleAuthenticationServiceMock},
        {provide: HTTP_INTERCEPTORS,useClass: HostInterceptor,multi: true}
      ]
    });
    service = TestBed.inject(HostInterceptor);
    googleAuthenticationService = TestBed.inject(GoogleAuthenticationService);
    httpMock = TestBed.inject(HttpTestingController);
    configService = TestBed.inject(ConfigService);
    httpClient = TestBed.inject(HttpClient);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();

  });

  it('should have Security headers', () => {
    console.log("Init Test - should add an Authorization header")
    httpClient.get("http://localhost:4200/test").subscribe((response: any) => {
      expect(response).toThrowError
    });

    const httpRequest = httpMock.expectOne("http://localhost:4200/test")

    expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
    expect(httpRequest.request.headers.get('X-Frame-Options')).toEqual('sameorigin')
    expect(httpRequest.request.headers.get('Strict-Transport-Security')).toEqual('max-age=31536000; includeSubDomains')
    expect(httpRequest.request.headers.get('X-Frame-Options')).toEqual('sameorigin')

  });

  it('should not have security headers', () => {
    console.log("Test: should not have security headers")
    httpClient.get("app.config.json").subscribe((response: any) => {
      console.log(response)
      expect(response).toThrowError
    });
    const httpRequest = httpMock.expectOne(`app.config.json`);
    expect(httpRequest.request.headers.has('Authorization')).toEqual(false);

  });




});
