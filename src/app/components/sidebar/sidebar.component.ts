import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    /*{ path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' },*/
    /*{ path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },*/
    { path: '/user-profile', title: 'Profilo',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/spese', title: 'Spese',  icon:'ni-bullet-list-67 text-red', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;
  loggedInUser: any = {};

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.loggedInUser = this.authService.currentUser();
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }

  logout(): void {
    this.authService.logout();
  }
}
