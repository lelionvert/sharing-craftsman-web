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

  constructor(private router: Router, private logoutService: LogoutService) { }

  ngOnInit() {
    this.state = 'inactive';
  }

  toggleState() {
    this.state = this.state === 'active' ? 'inactive' : 'active';
  }

  close() {
    this.state = 'inactive';
  }

  disconnect() {
    this.logoutService.logout();
    this.router.navigateByUrl('/');
  }
}
