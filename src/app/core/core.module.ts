import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProfileService} from "./profile/profile.service";
import {GoogleAuthenticationService} from "./login/google-authentication.service";
import {SidenavService} from "./sidenav/sidenav.service";
import {RouterExtService} from "./router/router-ext.service";
import {ConfigService} from "./config/config.service";
import {NegosService} from "./negos/negos.service";
import {OauthService} from './oauth/oauth.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
    ProfileService,
    SidenavService,
    GoogleAuthenticationService,
    RouterExtService,
    NegosService,
    ConfigService,
    OauthService
  ],
})
export class CoreModule { }
