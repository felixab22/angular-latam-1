import {inject, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Observable} from 'rxjs';

import {RouterExtService} from './router-ext.service';
import {Router} from '@angular/router';

describe('RouterExtService', () => {
    let service: RouterExtService;
    let router: { events: Observable<Event> };

    beforeEach(() => {
        router = jasmine.createSpyObj('Router', ['events']);
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [RouterExtService,
                { provide: Router, useValue: router },
            ]
        })
        service = TestBed.inject(RouterExtService);
    });

    it('RouterExtService instanced', inject([RouterExtService], (routerExtService: RouterExtService) => {
        expect(routerExtService).toBeTruthy();
    }));

    it('Check previousUrl',()=>{
        router.events = new Observable<Event>();
        service.ngOnInit();
        expect(service.getPreviousUrl()).toBeTruthy
      })

});
