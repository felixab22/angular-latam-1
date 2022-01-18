import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CardsSectionComponent} from './cards-section.component';
import {SharedModule} from "../../../../shared/shared.module";
import {DebugElement} from "@angular/core";

describe('CardsSectionComponent', () => {
  let component: CardsSectionComponent;
  let fixture: ComponentFixture<CardsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardsSectionComponent ],
      imports: [SharedModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should have <app-dashboard-card-grid>', () => {
    const bannerDe: DebugElement = fixture.debugElement;
    const bannerEl: HTMLElement = bannerDe.nativeElement;
    const p = bannerEl.querySelector('app-dashboard-card-grid')!;
    expect(p).toBeTruthy();
  });
});
