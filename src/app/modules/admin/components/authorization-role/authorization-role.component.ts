import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Role } from '../../models/role.model';
import { Group } from '../../models/group.model';
import { CookieService } from '../../../../services/browser/cookie.service';
import { AdminAuthorizationService } from '../../services/admin.authorization.service';
import { COOKIES } from '../../../../config/keys.config';

@Component({
  selector: 'sc-authorization-role',
  templateUrl: './authorization-role.component.html',
  styleUrls: ['./authorization-role.component.scss']
})
export class AuthorizationRoleComponent {
  @Input() public role: Role;
  @Input() public group: Group;
  @Output() success: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private cookieService: CookieService,
    private adminAuthorizationService: AdminAuthorizationService
  ) { }

  onDelete() {
    this.adminAuthorizationService
      .deleteAuthorization(
        this.cookieService.getCookie(COOKIES.username),
        this.cookieService.getCookie(COOKIES.token),
        {
          name: this.group.name,
          roles: [{ name: this.role.name }]
        }
      )
      .subscribe(
        response => this.handleDeleteReponse(response),
        error => this.handleErrorResponse(error)
      );
  }

  private handleDeleteReponse(response) {
    this.success.emit(true);
  }

  private handleErrorResponse(error) {
    this.success.emit(false);
  }
}
