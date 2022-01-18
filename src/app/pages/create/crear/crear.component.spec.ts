import {ComponentFixture, TestBed} from '@angular/core/testing';
import { ConfirmationService } from 'primeng/api';

import {CrearComponent} from './crear.component';
import {CardsSectionComponent} from "../../inicio/home/cards-section/cards-section.component";
import {SharedModule} from "../../../shared/shared.module";
import {DebugElement} from "@angular/core";
import {MessageService} from "primeng/api";
import {NegosService} from "../../../core/negos/negos.service";
import {Notificacion} from "../../../models/notificacion";
import {HarnessLoader} from "@angular/cdk/testing";
import {HotTableModule} from "@handsontable/angular";

const NOTIFICACIONMOCK: Notificacion[] = [
{
  message: "",
  position: 0,
},
  {
    message: "",
    position: 1,
  }
]
const SOLICITUDESMOCK = [
  {
    officeID: "",
    cuenta: "",
    fecha: "",
    tref: "",
    farebasis: "",
    carrier: "",
    numeroVuelo: "",
    clase: "",
    parPuntos: "",
    mensajeValidacion: "",
  },{
    officeID: "",
    cuenta: "",
    fecha: "",
    tref: "",
    farebasis: "",
    carrier: "",
    numeroVuelo: "",
    clase: "",
    parPuntos: "",
    mensajeValidacion: "",
  }
];

describe('CrearComponent', () => {
  let component: CrearComponent;
  let fixture: ComponentFixture<CrearComponent>;
  let negoservice: jasmine.SpyObj<NegosService>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    negoservice = jasmine.createSpyObj('NegosService', ['validate'])

    await TestBed.configureTestingModule({
      declarations: [ CrearComponent, CardsSectionComponent],
      providers: [MessageService,ConfirmationService,
        { provide: NegosService, useValue: negoservice },
      ],
      imports: [SharedModule, HotTableModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should have <app-page-header>', () => {
    const bannerDe: DebugElement = fixture.debugElement;
    const bannerEl: HTMLElement = bannerDe.nativeElement;
    const p = bannerEl.querySelector('app-page-header')!;
    expect(p).toBeTruthy();
  });

  it('should contain text "Creación de Negos"', () => {
    const bannerElement: HTMLElement = fixture.nativeElement;
    expect(bannerElement.textContent).toContain('Creación de Negos');
  });

  it('should invoke validate in createService OK', async () => {
    // negoservice.validate.and.returnValue(of(NOTIFICACIONMOCK))
    component.solicitudes = SOLICITUDESMOCK;
    fixture.detectChanges();
    component.processResponse(NOTIFICACIONMOCK);
    expect(component.solicitudes.length).toEqual(2);
  });

  it('should clean solicitudes in table', () => {
    component.limpiarData();
    fixture.detectChanges();
    expect(component.solicitudes.length).toEqual(1);
  });


  it('should invoke create in createService OK', async () => {
    // negoservice.validate.and.returnValue(of(NOTIFICACIONMOCK))
    component.solicitudes = SOLICITUDESMOCK;
    fixture.detectChanges();
    component.processResponseCreate(SOLICITUDESMOCK);
    expect(component.solicitudes.length).toEqual(2);
  });
});
