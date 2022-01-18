import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { EstadosResponse, EstadosSolicitud, RespEstadosSolicitud, userResponse } from 'src/app/models/estados';
import { ConsultaModel } from 'src/app/models/consulta';

@Injectable({
  providedIn: 'root'
})
export class EstadosListService {

  constructor(private http: HttpClient) {
  }
  getEstadosList(): Observable<EstadosResponse> {
    const url = 'http://localhost:9000/api/estados';
    return this.http.get<EstadosResponse>(url).pipe(
      catchError(e => {
        console.error(e.error.message);
        return throwError(() => new Error(e.error.message));
      })
    );
  }
  postSearhDataCreate(solicitudes: ConsultaModel): Observable<RespEstadosSolicitud> {
    console.log(solicitudes)
    const url = 'http://localhost:9000/api/response';
    return this.http.post<RespEstadosSolicitud>(url, solicitudes).pipe(
      catchError(e => {
        console.error(e.error.message);
        return throwError(() => new Error(e.error.message));
      })
    );
  }

  getUserEstados(): Observable<userResponse> {
    const url = 'http://localhost:9000/api/users';
    return this.http.get<userResponse>(url).pipe(
      catchError(e => {
        console.error(e.error.message);
        return throwError(() => new Error(e.error.message));
      })
    );
  }
  getTipos(): Observable<EstadosResponse> {
    const url = 'http://localhost:9000/api/tipos';
    return this.http.get<EstadosResponse>(url).pipe(
      catchError(e => {
        console.error(e.error.message);
        return throwError(() => new Error(e.error.message));
      })
    );
  }
}
