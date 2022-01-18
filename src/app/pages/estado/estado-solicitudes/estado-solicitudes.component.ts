import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConsultaModel } from 'src/app/models/consulta';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import {
  EstadosResponse,
  EstadosSolicitud,
  userResponse,
} from 'src/app/models/estados';
import { EstadosListService } from 'src/app/services/estados/estados-list.service';
import { getEstados, getTipos, getUser, postResponse } from '../estado.dato';

@Component({
  selector: 'app-estado-solicitudes',
  templateUrl: './estado-solicitudes.component.html',
  styleUrls: ['./estado-solicitudes.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class EstadoSolicitudesComponent implements OnInit {
  consulta = new ConsultaModel();
  solocitantes = new Array<userResponse>();
  estados = new Array<EstadosResponse>();
  // done = new Array<EstadosSolicitud>();
  done:any;
  tipo = new Array<EstadosResponse>();

  displayedColumns: string[] = [
    'applicantName',
    'applicantUser',
    'availableSeat',
    'createdDate',
    'updatedDate',
    'od',
    'pnr',
    'requestNumber',
    'requestType',
    'status',
  ];
  dataSource: MatTableDataSource<EstadosSolicitud>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _estadosListSrv: EstadosListService) {
    this.dataSource = new MatTableDataSource(this.done);
  }
  ngOnInit(): void {
    this.listStatus();
    this.listUserEstados();
    this.listestadoTipo();
  }
  listarTablaresponse() {
    console.log(this.consulta);
    // this._estadosListSrv
    //   .postSearhDataCreate(this.consulta)
    //   .subscribe((response: any) => {
        this.done = postResponse.data;
        this.dataSource = new MatTableDataSource(this.done);
    //     this.displayedColumns = [
    //       'applicantName',
    //       'applicantUser',
    //       'availableSeat',
    //       'createdDate',
    //       'od',
    //       'pnr',
    //       'requestNumber',
    //       'requestType',
    //       'status',
    //       'updatedDate',
    //     ];
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    //   });
  }
  listStatus() {
    // this._estadosListSrv.getEstadosList().subscribe((res: any) => {
    //   console.log(res);
       this.estados = getEstados;
    // });
  }
  listUserEstados() {
    // this._estadosListSrv.getUserEstados().subscribe((res: any) => {
    //   console.log(res);
    this.solocitantes = getUser;
    // });
  }
  listestadoTipo() {
  //   this._estadosListSrv.getTipos().subscribe((res: any) => {
  //     console.log(res);
      this.tipo = getTipos
  //   });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  sendData() {
    console.log(this.consulta);
  }
}
