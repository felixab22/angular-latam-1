import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AuthModule} from "./auth/auth.module";
import {SocialLoginModule} from "angularx-social-login";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AuthModule,
    SocialLoginModule,
  ],

  bootstrap: [AppComponent],
  providers: []
})
export class AppModule { }
