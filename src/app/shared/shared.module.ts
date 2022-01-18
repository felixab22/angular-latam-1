import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {GoogleLoginProvider, SocialAuthServiceConfig} from 'angularx-social-login';
import {gcpClientId} from 'src/environments/environment.dev';
import {SidebarComponent} from './sidebar/sidebar.component';
import {TopbarComponent} from './topbar/topbar.component';
import {RouterModule} from '@angular/router';


import {SidenavService} from "../core/sidenav/sidenav.service";
import {HttpClientModule} from "@angular/common/http";
import {PageHeaderComponent} from './page-header/page-header.component';
import {DashboardCardGridComponent} from './card-grids/simple-card-grid/dashboard-card-grid.component';
import { CustomMaterialModule } from '../CustomMaterial.module';




@NgModule({
  declarations: [
    LoginComponent,
    TopbarComponent,
    SidebarComponent,
    PageHeaderComponent,
    DashboardCardGridComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    CustomMaterialModule
  ],
  exports: [
    LoginComponent,
    TopbarComponent,
    SidebarComponent,
    PageHeaderComponent,
    DashboardCardGridComponent
  ],
  providers: [
    SidenavService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(gcpClientId)
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
})
export class SharedModule { }
