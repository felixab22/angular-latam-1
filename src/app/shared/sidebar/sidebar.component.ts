import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Menu} from 'src/app/models/menu';
import {ProfileService} from 'src/app/core/profile/profile.service';
import {SidenavService} from "../../core/sidenav/sidenav.service";
import {MatSidenav} from "@angular/material/sidenav";
import {Router} from '@angular/router';
import {SocialAuthService} from "angularx-social-login";
import {BG} from 'src/environments/environment.prod';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterViewInit{
  @ViewChild('sidenav') sidenav: MatSidenav;

  optionsMenu: Menu[];
  groupNameProfile: string = BG.setClient;
  roles= localStorage.getItem('roles');

  constructor(
    private _router: Router,
    private sidenavService: SidenavService,
    private authService: SocialAuthService,
    private profileService: ProfileService) {

  }

  ngOnInit(): void {
    this.sidenavService.menuState.subscribe( async(isOpen: boolean) => {
      if(isOpen) {
        await this.sidenav.close();
      }
      else{
        await this.sidenav.open();
      }
    });
    this.getOptionsMenu();
  }

  getOptionsMenu(): void{
    if(this.roles === 'admin') {
      this.groupNameProfile= BG.setAdm;
    }
    this.profileService.getOptionsMenu(this.groupNameProfile
        ).subscribe(response => {
          console.log(response);          
      this.optionsMenu = response;
    });
  }

  ngAfterViewInit(): void {
    this.sidenavService.open();
  }

  selectOption(optionNumber: number): void{
    this.cleanMenuOptionsStyle();
    this.setOptionSelectedStyle(optionNumber);
    this.sidenavService.close();
  }

  setOptionSelectedStyle(optionNumber: number){
    let element = <HTMLElement>document.getElementById('option_' + optionNumber);
    element.setAttribute('class', 'menu-option-selected');
  }

  cleanMenuOptionsStyle(): void{
    for(let i = 0; i < this.optionsMenu.length; i++){
      let element: HTMLElement = <HTMLElement>document.getElementById('option_' + i);
      element.setAttribute('class', 'menu-option');
    }
  }

  closeSideNav(): void{
    this.sidenavService.close();
  }

  openSideNav(): void{
    this.sidenavService.open();
  }

  salir(){
    setTimeout(() => {
      this.authService.signOut().then().catch();
      this._router.navigate(['/']);
      localStorage.clear();
    },500)
    this.authService.signOut().then().catch();
  }
}
