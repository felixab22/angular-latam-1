import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardCardGridComponent} from './dashboard-card-grid.component';
import {DebugElement} from "@angular/core";
import {InicioConstants} from "../../../pages/inicio/constants";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {SharedModule} from "../../shared.module";

const GRIDS = [
  {
    id: InicioConstants.NEGOS_CREADOS_ID,
    title: 'Negos Creados',
    content: '123', // Mock
    buttonText: 'Ver Detalle',
    cols: 1,
    rows: 1,
    color:'#99E1DE'
  },
  {
    id: InicioConstants.NEGOS_PENDIENTES_ID,
    title: 'Negos Pendientes',
    content: '82', // Mock
    buttonText: 'Ver Detalle',
    cols: 1,
    rows: 1,
    color:'#FFC700'
  },
  {
    id: InicioConstants.NEGOS_APROBADOS_ID,
    title: 'Negos Aprobados',
    content: '46', // Mock
    buttonText: 'Ver Detalle',
    cols: 1,
    rows: 1,
    color:'#00B5AD'
  },
  {
    id: InicioConstants.NEGOS_RECHAZADOS_ID,
    title: 'Negos Rechazados',
    content: '3', // Mock
    buttonText: 'Ver Detalle',
    cols: 1,
    rows: 1,
    color:'#B30F3B'
  },
];

describe('SimpleCardGridComponent', () => {
  let component: DashboardCardGridComponent;
  let fixture: ComponentFixture<DashboardCardGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        SharedModule,
      ],
      declarations: [DashboardCardGridComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCardGridComponent);
    component = fixture.componentInstance;
    component.columns = 2;
    component.gridCardItems = GRIDS;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should have <mat-grid-list>', () => {
    const bannerDe: DebugElement = fixture.debugElement;
    const bannerEl: HTMLElement = bannerDe.nativeElement;
    const p = bannerEl.querySelector('mat-grid-list')!;
    expect(p).toBeTruthy();
  });

  it('Should have <mat-card>', () => {
    const bannerDe: DebugElement = fixture.debugElement;
    const bannerEl: HTMLElement = bannerDe.nativeElement;
    const p = bannerEl.querySelectorAll('mat-card')!;
    expect(p.length).toEqual(4);
  });

});
