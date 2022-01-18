import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SidebarComponent} from './sidebar.component';
import {SidenavService} from "../../core/sidenav/sidenav.service";
import {ProfileService} from "../../core/profile/profile.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatSidenavModule} from "@angular/material/sidenav";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {RouterModule} from "@angular/router";
import {DebugElement} from "@angular/core";
import {SocialAuthService, SocialUser} from 'angularx-social-login';
import {Observable, of} from 'rxjs';
import {HarnessLoader} from "@angular/cdk/testing";
import {MatListModule} from "@angular/material/list";
import {TestbedHarnessEnvironment} from "@angular/cdk/testing/testbed";

const MENUMOCK = [
  {
    id: 1,
    opcion: "Dashboard",
    path: "/pages/dashboard",
    icon: "fa fa-dasboard"
  },
  {
    id: 2,
    opcion: "Creación de Negos",
    path: "/pages/dashboard",
    icon: "fa fa-dasboard"
  },
  {
    id: 3,
    opcion: "Reducción / Cancelación",
    path: "/pages/dashboard",
    icon: "fa fa-dasboard"
  },{
    id: 4,
    opcion: "Estado de Solicitudes",
    path: "/pages/dashboard",
    icon: "fa fa-dasboard"
  },
  {
    id: 5,
    opcion: "Validacion de Solicitudes",
    path: "/pages/dashboard",
    icon: "fa fa-dasboard"
  }]

describe('SidebarComponent', () => {
  let sidenavService: SidenavService;
  let profileService: ProfileService;
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  let socialAuthService: SocialAuthService;
  let socialAuthtSpy: { authState: Observable<SocialUser>, initState:Observable<boolean> ; }

  let loader: HarnessLoader;

  const sidenavServiceMock = {
    asObservable: () => of([true])
  };

  const profileServiceMock = {
    getOptionsMenu: () => of(MENUMOCK)
  };

  const socialUserMock = <SocialUser> {
    "provider": "string",
    "id": "string",
    "email": "string",
    "name": "string",
    "photoUrl": "string",
    "firstName": "string",
    "lastName": "string",
    "authToken": "string",
    "idToken": "string",
    "authorizationCode": "string",
    "response": "string"
  }

  beforeEach(async () => {
    sidenavService = new SidenavService();
    sidenavService.menuIsOpen = false;

    socialAuthtSpy = jasmine.createSpyObj('SocialAuthService', ['signOut']);

    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        HttpClientTestingModule,
        MatSidenavModule,
        MatListModule,
        RouterModule.forRoot([])
      ],
      declarations: [
        SidebarComponent,
      ],
      providers: [
        ProfileService,
        {provide: ProfileService, useValue: profileServiceMock},
        {provide: SidenavService, useValue: sidenavService},
        { provide: SocialAuthService, useValue: socialAuthtSpy }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    component.optionsMenu = MENUMOCK;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have 5 menu options', () => {
    const componentDe: DebugElement = fixture.debugElement;
    const componentEl: HTMLElement = componentDe.nativeElement;
    const result = componentEl.querySelectorAll('a');
    expect(result.length).toEqual(6);
  });

  it('should have mat-sidenav-content', () => {
    const componentDeb = fixture.debugElement;
    const componentEl = componentDeb.nativeElement;
    const result = componentEl.querySelector('mat-sidenav-content');
    expect(result).toBeTruthy();
  });

  it('should optionsmenu change', async () => {
    component.getOptionsMenu();
    fixture.detectChanges();
    expect(component.optionsMenu).toEqual(MENUMOCK);
  });

  it('should close sidenavbar', async () => {
    component.closeSideNav();
    component.selectOption(1);
    fixture.detectChanges();
    expect(sidenavService.isOpen()).toBeFalse();
  });

  it('should Open sidenavbar', async () => {
    component.openSideNav();
    fixture.detectChanges();
    expect(sidenavService.isOpen()).toBeTrue();
  });

});
