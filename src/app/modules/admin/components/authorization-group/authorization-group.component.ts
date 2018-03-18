import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Group } from '../../models/group.model';

@Component({
  selector: 'sc-authorization-group',
  templateUrl: './authorization-group.component.html',
  styleUrls: ['./authorization-group.component.scss']
})
export class AuthorizationGroupComponent { 
  @Input() public group: Group;
  @Output() success: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  private handleDeleteAuthorization(success) {
    this.success.emit(success);
  }
}
