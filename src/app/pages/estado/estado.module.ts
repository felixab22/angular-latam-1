import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadoSolicitudesComponent } from './estado-solicitudes/estado-solicitudes.component';
import { Route, RouterModule } from '@angular/router';
import { BlockUIModule } from 'primeng/blockui';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomMaterialModule } from 'src/app/CustomMaterial.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableExporterModule } from 'mat-table-exporter';

const router: Route[] = [
  {
      path     : '',
      component: EstadoSolicitudesComponent
  }

];

@NgModule({
  declarations: [
    EstadoSolicitudesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(router),
    ToastModule,
    SharedModule,
    BlockUIModule,
    ConfirmDialogModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    MatTableExporterModule
  ]
})
export class EstadoModule { }
