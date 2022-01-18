import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Notificacion} from 'src/app/models/notificacion';
import {Solicitud} from 'src/app/models/solicitud';

@Injectable()
export class NegosService {

  readonly solicitudApi = '/api/create/';

  constructor(private http: HttpClient) {
  }

  validate(solicitudes: Solicitud[]): Observable<Notificacion[]> {
    const url = this.solicitudApi +  'solicitud/validate';
    return this.http.post<Notificacion[]>(url, solicitudes).pipe(
      catchError(e => {
        console.error(e.error.message);
        return throwError(() => new Error(e.error.message));
      })
    );
  }

  create(solicitudes: Solicitud[]): Observable<Solicitud[]> {
    const url = this.solicitudApi +  'solicitud/';
    return this.http.post<Solicitud[]>(url, solicitudes).pipe(
      catchError(e => {
        console.error(e.error.message);
        return throwError(() => new Error(e.error.message));
      })
    );
  }

}
