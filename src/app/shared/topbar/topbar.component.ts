import {Component} from '@angular/core';
import {SidenavService} from "../../core/sidenav/sidenav.service";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {
  user: SocialUser = JSON.parse(localStorage.getItem('user') || '{}');
  roles= localStorage.getItem('roles') || '';

  constructor(private sidenavService: SidenavService) {

  }

  toggleSideBar(){
    this.sidenavService.toggle();
  }


}
export declare class SocialUser {
  provider: string;
  id: string;
  email: string;
  name: string;
  photoUrl: string;
  firstName: string;
  lastName: string;
  authToken: string;
  idToken: string;
  authorizationCode: string;
  response: any;
}
