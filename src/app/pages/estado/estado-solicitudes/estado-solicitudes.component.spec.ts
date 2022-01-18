import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoSolicitudesComponent } from './estado-solicitudes.component';

describe('EstadoSolicitudesComponent', () => {
  let component: EstadoSolicitudesComponent;
  let fixture: ComponentFixture<EstadoSolicitudesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadoSolicitudesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadoSolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
