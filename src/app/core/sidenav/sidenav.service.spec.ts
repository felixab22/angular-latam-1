import {TestBed} from '@angular/core/testing';

import {SidenavService} from './sidenav.service';

describe('SidenavService', () => {
  let service: SidenavService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SidenavService]
    });
    service = TestBed.inject(SidenavService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#isOpen should return false value', () => {
    service.close();
    expect(service.isOpen()).toBe(false);
  });

  it('#isOpen should return false value after #silenceClose', () => {
    service.silenceClose();
    expect(service.isOpen()).toBe(false);
  });

  it('#isOpen should return true value', () => {
    service.open();
    expect(service.isOpen()).toBe(true);
  });

  it('#isOpen should return true value after #silenceOpen', () => {
    service.silenceOpen();
    expect(service.isOpen()).toBe(true);
  });

  it('#toggle should return opposite state (false)', () => {
    service.open();
    service.toggle();
    expect(service.isOpen()).toBe(false);
  });
});
