import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class OauthService {

  oauthURL = 'authorization-service/';

  constructor(private httpClient: HttpClient) { }

  public aoutUser(tokenDto: string): Observable<any> {
    const url = this.oauthURL + 'authorization/roles';
    return this.httpClient.get<any>(url, {headers: new HttpHeaders({'Authorization': `Bearer ${tokenDto}`})});
  }
}
