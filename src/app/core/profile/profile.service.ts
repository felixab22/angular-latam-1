import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Menu} from 'src/app/models/menu';

@Injectable()
export class ProfileService {

  private profileApi = '/api/profile/';

  constructor(public http: HttpClient) { }


  getOptionsMenu(groupProfile: string): Observable<Menu[]> {
    const url = this.profileApi +  'menuGrupo/nombreGrupo/'+groupProfile;
    return this.http.get<Menu[]>(url).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }
}
