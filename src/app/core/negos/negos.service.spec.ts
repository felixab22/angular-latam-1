import {of} from 'rxjs';
import {Notificacion} from 'src/app/models/notificacion';

import {NegosService} from './negos.service';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import { Solicitud } from 'src/app/models/solicitud';

const REQUEST = [{
  officeID:"",
  cuenta:"",
  fecha:"",
  tref:"",
  farebasis:"",
  carrier:"",
  numeroVuelo:"",
  clase:"",
  parPuntos:""}];

describe('CreateService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: NegosService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new NegosService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an error when the server returns a 404', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });

    httpClientSpy.post.and.returnValue(of(errorResponse));

    service.validate(REQUEST).subscribe({
      next: (data) => console.log('expected an error, not heroes'),
      error: (err) => {
        expect(err.message).toContain('test 404 error');
      },
    });
  });

  it('should return one notification with error', () => {

    let expectedResponse: Notificacion[]= [{position:1,
      message:"Error en la fila 1"}];

    httpClientSpy.post.and.returnValue(of(expectedResponse));

    service.validate(REQUEST).subscribe(resultService => {
      expect(resultService).toEqual(expectedResponse);
    });
  });


  it('should successfully create', () => {

    let expectedResponse: Solicitud[]= REQUEST;

    httpClientSpy.post.and.returnValue(of(expectedResponse));

    service.create(REQUEST).subscribe(resultService => {
      expect(resultService).toEqual(expectedResponse);
    });
  });

  it('should return an error to create when the server returns a 400', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 400 error',
      status: 400, statusText: 'Not Found'
    });

    httpClientSpy.post.and.returnValue(of(errorResponse));
   
    service.create(REQUEST).subscribe({
      next: (data) => console.log('expected an error'),
      error: (err) => {
        expect(err.message).toContain('test 400 error');
      },
    });
  });


});
