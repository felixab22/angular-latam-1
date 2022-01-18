import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable()
export class SidenavService {

  menuState : Subject<boolean>;
  menuIsOpen: boolean = true;

  constructor() {
    this.menuState = new Subject<boolean>();
  }

  /**
   * If menu is open, let close it
   **/
  public open() {
    if(!this.menuIsOpen) {
      this.menuIsOpen = true;
      this.menuState.next(true);
    }
  }
  /**
   * Both silence open and close is use by navbar output, to silence switch internal flag.
   **/
  public silenceOpen() {
    this.menuIsOpen = true;
  }
  public silenceClose() {
    this.menuIsOpen = false;
  }

  /**
   * If menu is close, let open it
   **/
  public close() {
    if(this.menuIsOpen) {
      this.menuIsOpen = false;
      this.menuState.next(false);
    }
  }

  public toggle() {
    this.menuIsOpen = !this.menuIsOpen;
    this.menuState.next(this.menuIsOpen);
  }

  public isOpen(): boolean{
    return this.menuIsOpen;
  }

  public asObservable(){
    return this.menuState.asObservable();
  }
}
