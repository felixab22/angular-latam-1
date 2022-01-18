import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CrearComponent} from './crear/crear.component';
import {Route, RouterModule} from '@angular/router';
import {ButtonModule} from 'primeng/button';
import {HotTableModule} from '@handsontable/angular';
import {ToastModule} from 'primeng/toast';
import {BlockUIModule} from 'primeng/blockui';
import {SharedModule} from "../../shared/shared.module";
import {NegosService} from "../../core/negos/negos.service";
import {ActionButtonsComponent} from './crear/action-buttons/action-buttons.component';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { CustomMaterialModule } from 'src/app/CustomMaterial.module';

const CreateRouter: Route[] = [
  {
      path     : '',
      component: CrearComponent
  },

];


@NgModule({
  declarations: [
    CrearComponent,
    ActionButtonsComponent
  ],
  imports: [
    HotTableModule,
    CommonModule,
    ButtonModule,
    RouterModule.forChild(CreateRouter),
    ToastModule,
    SharedModule,
    BlockUIModule,
    ConfirmDialogModule,
    CustomMaterialModule
  ],
  providers: [NegosService]
})
export class CreateModule { }
