import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TopbarComponent} from './topbar.component';
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {SidenavService} from "../../core/sidenav/sidenav.service";

import {MatIconHarness} from '@angular/material/icon/testing';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';

describe('TopbarComponent', () => {
  let component: TopbarComponent;
  let fixture: ComponentFixture<TopbarComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopbarComponent ],
      imports: [
        NoopAnimationsModule
      ],
      providers: [
        SidenavService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopbarComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('shound have mat Icon', async () => {
    const buttons = await loader.getAllHarnesses(MatIconHarness);
    expect(buttons).toBeTruthy()
  });

  it('shound have svg (Latam Icon)', () => {
    const componentDeb = fixture.debugElement;
    const componentEl: HTMLElement = componentDeb.nativeElement;
    const result = componentEl.querySelector('svg');
    expect(result).toBeTruthy()
  });

});
