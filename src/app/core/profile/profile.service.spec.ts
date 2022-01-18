import {TestBed} from '@angular/core/testing';
import {of} from 'rxjs';

import {ProfileService} from './profile.service';
import {HttpErrorResponse} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

const MENUMOCK = [
  {
    id: 1,
    opcion: "Dashboard",
    path: "/pages/dashboard",
    icon: "fa fa-dasboard"
  },
  {
    id: 2,
    opcion: "Creación de Negos",
    path: "/pages/dashboard",
    icon: "fa fa-dasboard"
  },
  {
    id: 3,
    opcion: "Reducción / Cancelación",
    path: "/pages/dashboard",
    icon: "fa fa-dasboard"
  },{
    id: 4,
    opcion: "Estado de Solicitudes",
    path: "/pages/dashboard",
    icon: "fa fa-dasboard"
  },
  {
    id: 5,
    opcion: "Validacion de Solicitudes",
    path: "/pages/dashboard",
    icon: "fa fa-dasboard"
  }]

describe('ProfileService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let httpTestingController: HttpTestingController;
  let service: ProfileService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new ProfileService(httpClientSpy as any);

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ProfileService]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return menu options by profile', () => {
    httpClientSpy.get.and.returnValue(of(MENUMOCK));
    service.getOptionsMenu("admin@tatam").subscribe(resultService => {
      expect(resultService).toEqual(MENUMOCK);
    });
  });

  it('should return an error when the server returns a 404', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });

    httpClientSpy.get.and.returnValue(errorResponse);

    service.getOptionsMenu("admin@tatam").subscribe({
      next: (data) => console.log('expected an error, not heroes'),
      error: (err) => {
        expect(err.message).toContain('test 404 error');
      },
    });
  });

});
