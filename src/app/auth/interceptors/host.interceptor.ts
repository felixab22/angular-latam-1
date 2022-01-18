import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { TransferState } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import {GoogleAuthenticationService} from "../../core/login/google-authentication.service";


@Injectable()
export class HostInterceptor implements HttpInterceptor {

  private readonly API_URL: string;
  private googleAuthenticationService:GoogleAuthenticationService;

  private AppInjector: Injector;

  constructor(private ts: TransferState, private injector: Injector) {
     this.AppInjector = this.injector;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {


    if(req.url.includes("app.config.json")){
      return next.handle(req);
    }

      this.googleAuthenticationService = this.AppInjector.get(GoogleAuthenticationService);
      const token = this.googleAuthenticationService.getSocialUser?.idToken


      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',

        //security Dont Remove it
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
        'X-Frame-Options': 'sameorigin',
        'X-XSS-Protection': '1',
        'Authorization': "Bearer " + token
      });
      const request = req.clone({ url: req.url , headers});
      return next.handle(request);

  }
}
