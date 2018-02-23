import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import './menu.scss';

@Component({
  selector: 'sc-menu',
  templateUrl: './menu.html',
  styleUrls: ['./menu.scss'],
  animations: [
    trigger('menuState', [
      state('inactive', style({ transform: 'translateX(-100%)' })),
      state('active', style({ transform: 'translateX(0)' })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ]
})
export class MenuComponent implements OnInit {
  private state: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.state = 'inactive';
  }

  toggleState() {
    this.state = this.state === 'active' ? 'inactive' : 'active';
  }
}
