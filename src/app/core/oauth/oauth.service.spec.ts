import {TestBed} from '@angular/core/testing';
import {of} from 'rxjs';
import {HttpErrorResponse} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import { OauthService } from './oauth.service';

let tokenDto = '#token#';

  let rolesMock = [ 'admin' ];

describe('OauthService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let httpTestingController: HttpTestingController;
  let service: OauthService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new OauthService(httpClientSpy as any);

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [OauthService]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(OauthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return menu options by profile', () => {
    httpClientSpy.get.and.returnValue(of(rolesMock));
    service.aoutUser(tokenDto).subscribe(resultService => {
      expect(resultService).toEqual(rolesMock);
    });
  });

  it('should return an error when the server returns a 404', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });

    httpClientSpy.get.and.returnValue(errorResponse);

    service.aoutUser(tokenDto).subscribe({
      next: (data) => console.log('expected an error, not heroes'),
      error: (err) => {
        expect(err.message).toContain('test 404 error');
      },
    });
  });

});
