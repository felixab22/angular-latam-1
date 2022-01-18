import { TestBed } from '@angular/core/testing';
import {of} from 'rxjs';

import { EstadosListService } from './estados-list.service';
import { ConsultaModel } from 'src/app/models/consulta';
import { EstadosResponse, RespEstadosSolicitud } from 'src/app/models/estados';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

let service: EstadosListService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let consultaMock: ConsultaModel = {
  dateFrom:'2021-11-27',
  dateTo:'2021-12-27',
  applicantUser: '',
  requestType: '',
  status:'',
  requestNumber:'',
  pnr:'',
  profile : 'admin',
  user : 'jhosefquijana.acidlabs@latam.com',
}
let respuesMock :RespEstadosSolicitud= {
  page: 1,
  limit: 20,
  data: [{
    createdDate: '2021-11-27',
    updatedDate: '2021-12-27',
    requestNumber: 1,
    requestType: '',
    availableSeat: '',
    od: '',
    status: '',
    pnr: '',
    applicantName: 'admin',
    applicantUser: 'jhosefquijana.acidlabs@latam.com'
  }],
  pages: 0
}	
let tipoMock = {
  id: 'string',
  applicantUser: 'string',
  applicanFullName : 'string',
}
let estadosMock :EstadosResponse = {
  id: '123423425',
  label: 'Pendiente',
}
	

describe('EstadosListService', () => {
  afterEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new EstadosListService(httpClientSpy);
    TestBed.configureTestingModule({});

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [EstadosListService]
    });
  })
  // beforeEach(() => {
  //   httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
  //   service = new EstadosListService(httpClientSpy);
  //   TestBed.configureTestingModule({});

  //   TestBed.configureTestingModule({
  //     imports: [ HttpClientTestingModule ],
  //     providers: [EstadosListService]
  //   });
  // });

  it('postSearhDataCreate return an error when the server returns a 404', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });
    httpClientSpy.post.and.returnValue(of(errorResponse));
    service.postSearhDataCreate(consultaMock).subscribe({
      next: (data) => console.log('expected an error, not heroes'),
      error: (err) => {
        expect(err.message).toContain('test 404 error');
      },
    });
  });

  it('postSearhDataCreate return one notification with error', () => {
    httpClientSpy.post.and.returnValue(of(respuesMock));
    service.postSearhDataCreate(consultaMock).subscribe(resultService => {
    expect(resultService).toEqual(respuesMock);
    });
  });

  it('getEstadosList return an error when the server returns a 404', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });
    httpClientSpy.get.and.returnValue(of(errorResponse));
    service.getEstadosList().subscribe({
      next: (data) => console.log('expected an error, not heroes'),
      error: (err) => {
        expect(err.message).toContain('test 404 error');
      },
    });
  });

  it('getEstadosList return one notification with error', () => {
    httpClientSpy.get.and.returnValue(of(estadosMock));
    service.getEstadosList().subscribe(resultService => {
    expect(resultService).toEqual(estadosMock);
    });
  });

  it('getUserEstados return an error when the server returns a 404', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });
    httpClientSpy.get.and.returnValue(of(errorResponse));
    service.getUserEstados().subscribe({
      next: (data) => console.log('expected an error, not heroes'),
      error: (err) => {
        expect(err.message).toContain('test 404 error');
      },
    });
  });

  it('getUserEstados return one notification with error', () => {
    httpClientSpy.get.and.returnValue(of(tipoMock));
    service.getUserEstados().subscribe(resultService => {
    expect(resultService).toEqual(tipoMock);
    });
  });

  it('getTipos return an error when the server returns a 404', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });
    httpClientSpy.get.and.returnValue(of(errorResponse));
    service.getTipos().subscribe({
      next: (data) => console.log('expected an error, not heroes'),
      error: (err) => {
        expect(err.message).toContain('test 404 error');
      },
    });
  });

  it('getTipos return one notification with error', () => {
    httpClientSpy.get.and.returnValue(of(estadosMock));
    service.getTipos().subscribe(resultService => {
    expect(resultService).toEqual(estadosMock);
    });
  });

});
