import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {BrowserModule} from "@angular/platform-browser";
import {PagesModule} from "../pages/pages.module";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthRoutingModule} from "./auth-routing.module";
import {CoreModule} from "../core/core.module";
import {AuthenticationGuard} from "./guards/authentication/authentication.guard";
import {HostInterceptor} from "./interceptors/host.interceptor";


@NgModule({
  declarations: [],
  exports: [AuthRoutingModule],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AuthRoutingModule,
    PagesModule,
    FormsModule,
    BrowserAnimationsModule,
    CoreModule,
  ],
  providers:[
    AuthenticationGuard,
    HostInterceptor
  ],
})
export class AuthModule { }
