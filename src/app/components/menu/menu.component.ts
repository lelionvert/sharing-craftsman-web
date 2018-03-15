import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { LogoutService } from '../../services/user/logout.service';
import { AuthorizationService } from '../../services/authorization/authorization.service';
import { HTTP_RESPONSE } from '../../config/app.config';

@Component({
  selector: 'sc-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    trigger('menuState', [
      state('inactive', style({ transform: 'translateX(-110%)' })),
      state('active', style({ transform: 'translateX(0)' })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ]
})
export class MenuComponent implements OnInit {
  private state: string;
  public isAuthenticated: boolean = false;

  constructor(
    private router: Router,
    private logoutService: LogoutService,
    private authorizationService: AuthorizationService
  ) { }

  ngOnInit() {
    this.state = 'inactive';
    this.checkIfAuthenticated();
  }

  toggleState() {
    this.state = this.state === 'active' ? 'inactive' : 'active';
    this.checkIfAuthenticated();
  }

  close() {
    this.state = 'inactive';
  }

  disconnect() {
    this.logoutService.logout();
    this.router.navigateByUrl('/');
  }

  private checkIfAuthenticated() {
    this.authorizationService
      .isAuthenticated()
      .subscribe(
        response => this.handleAuthenticatedResponse(response),
        error => this.handleAuthenticatedResponse(error)
      );
  }

  private handleAuthenticatedResponse(response) {
    if (response.status === HTTP_RESPONSE.OK) {
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }
  }
}
