import {Component, OnInit, ViewChild} from '@angular/core';
import {HotTableComponent} from '@handsontable/angular';
import Handsontable from 'handsontable';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Solicitud} from 'src/app/models/solicitud';
import {NegosService} from "../../../core/negos/negos.service";
import {Notificacion} from "../../../models/notificacion";
import {keys} from "../../../../environments/environment.dev";
import { SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {

  user: SocialUser = JSON.parse(localStorage.getItem('user')|| '{}');
  roles= localStorage.getItem('roles')|| 'admin';

  @ViewChild("hot", {static: false}) hot: HotTableComponent;

  solicitudes: Solicitud[] = [];
  disableValidation = false;
  disableSend = true;
  blockedDocument: boolean = false;



  hotSettings: Handsontable.GridSettings = {
    data: this.solicitudes,
    colWidths: [120, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78],
    afterChange: (changes) => {
      this.disableValidation = false;
      this.disableSend = true;
    },
    licenseKey: keys.handsOnTableKey
  };


  constructor(
    private messageService: MessageService,
    private createService: NegosService) {
  }

  ngOnInit(): void {
    this.loadDefaultData();
  }

  loadDefaultData() {
    let s: Solicitud = {
      officeID: "",
      cuenta: "",
      fecha: "",
      tref: "",
      farebasis: "",
      carrier: "",
      numeroVuelo: "",
      clase: "",
      parPuntos: ""
    };
    this.solicitudes.push(s);
  }

  limpiarData() {
    this.solicitudes = [];
    this.loadDefaultData();
    this.hot.updateHotTable({data: this.solicitudes});
    this.disableValidation = false;
    this.disableSend = true;
  }


  validar() {
    this.blockedDocument = true;
    this.solicitudes = this.solicitudes.map(item => {
      item.usuarioCreacion=this.user.email;
      item.mensajeValidacion="";
      return item;
    });

    this.createService.validate(this.solicitudes).subscribe(
      {
        next: (response) => this.processResponse(response),
        error: (e) => {
          this.handleError(e, ". Porfavor revise los tipos de datos");
          this.blockedDocument=false;
        },
        complete:()=> {
          this.blockedDocument=false
        },
      }
    )
  }


  crear() {
    
    this.blockedDocument = true;

    this.createService.create(this.solicitudes).subscribe(
      {
        next: (response) => this.processResponseCreate(response),
        error: (e) => {
          this.handleError(e, "");
          this.blockedDocument=false;
        },
        complete:()=> {
          this.limpiarData();
          this.blockedDocument=false
        }
      }
    )
  }

  public processResponseCreate(solicitudes: Solicitud[]): void{
    this.messageService.add({
      severity: 'success',
      summary: 'Exito',
      detail: 'Se crearon las solicitudes de manera exitosa'
    });
  }
  public processResponse(notifications: Notificacion[]): void{
    
    if (notifications.length > 0) {
      notifications.forEach(e => {
        this.solicitudes[e.position].mensajeValidacion = e.message;
      });
      this.hot.updateHotTable({data: this.solicitudes});
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Se encontraron errores en la data, favor de revisar la columna Validacion'
      });
    } else {
      this.hot.updateHotTable({data: this.solicitudes});
      this.disableValidation = true;
      this.disableSend = false;
      this.messageService.add({
        severity: 'success',
        summary: 'Exito',
        detail: 'No se encontraron errores en la data'
      });
    }

    
  }

  private handleError(error: Error, aditionalMessage:String): void{
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: error.message + aditionalMessage
    });
  }
}
