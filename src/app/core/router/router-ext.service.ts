import { Injectable, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Injectable()
export class RouterExtService  implements OnInit {

  private previousUrl: string = "/pages/dashboard";
  private currentUrl: string = '';

  constructor(private router : Router) {

  }

  ngOnInit(): void {
    this.currentUrl = this.router.url;
  }

  public getPreviousUrl(){
    return this.previousUrl;
  }
}
