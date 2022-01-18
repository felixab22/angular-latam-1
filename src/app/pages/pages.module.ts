import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PagesComponent} from './pages.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {ConfirmationService, ContextMenuService, MessageService} from 'primeng/api';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    PagesComponent
  ],
  exports: [PagesComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    BrowserAnimationsModule
  ],
  providers: [
    MessageService,
    ConfirmationService,
    ContextMenuService],

  schemas: [NO_ERRORS_SCHEMA]
})
export class PagesModule { }
