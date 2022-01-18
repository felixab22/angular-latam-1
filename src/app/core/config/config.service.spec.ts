import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {of} from 'rxjs/internal/observable/of';

import {ConfigService} from './config.service';

describe('ConfigService', () => {
  let service: ConfigService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        ConfigService,
        {provide: HttpClient, useClass: HttpClient}
      ]
    });
    service = TestBed.inject(ConfigService);
    http = TestBed.inject(HttpClient)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be created', () => {
    console.log("demoConfigTest")
    const spyHttp = spyOn(http,'get').and.returnValue(of(true))
    service.load()
    expect(spyHttp).toHaveBeenCalled
    expect(service.settings).toBeDefined
    expect(service.GSuiteClientID).toBeDefined
  });
});
