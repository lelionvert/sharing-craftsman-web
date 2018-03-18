import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CookieService } from '../../../../services/browser/cookie.service';
import { Group } from '../../models/group.model';
import { COOKIES } from '../../../../config/keys.config';
import { HttpErrorResponse } from '@angular/common/http';
import { AdminUserService } from '../../services/admin.user.service';
import { User } from '../../models/user.model';
import { AdminAuthorizationService } from '../../services/admin.authorization.service';
import { Authorization } from '../../forms/authorization.form';

@Component({
  selector: 'sc-admin-user-authorization',
  templateUrl: './user-authorization.component.html',
  styleUrls: ['./user-authorization.component.scss']
})
export class AdminUserAuthorizationComponent implements OnInit {
  @Input() user: User;
  @Output() updated: EventEmitter<boolean> = new EventEmitter<boolean>();
  public groups: Group[];
  public model: Authorization;
  private errorMessage: string;

  constructor(
    private cookieService: CookieService,
    private adminUserService: AdminUserService,
    private adminAuthorizationService: AdminAuthorizationService
  ) {
    this.groups = [];
    this.model = new Authorization('', '');
  }

  ngOnInit() {
    this.getAuthorizations();
  }

  addGroup() {
    this.adminUserService
      .addGroupToUser(
        this.cookieService.getCookie(COOKIES.username),
        this.cookieService.getCookie(COOKIES.accessToken),
        {
          username: this.user.username,
          group: this.model.group
        }
      )
      .subscribe(
        response => this.handleUpdateReponse(response),
        error => this.handleErrorResponse(error)
      );
  }

  onClickDelete(groupName) {
    this.adminUserService
      .removeGroupFromUser(
        this.cookieService.getCookie(COOKIES.username),
        this.cookieService.getCookie(COOKIES.accessToken),
        {
          username: this.user.username,
          group: groupName
        }
      )
      .subscribe(
        response => this.handleUpdateReponse(response),
        error => this.handleErrorResponse(error)
      );
  }

  private getAuthorizations() {
    this.adminAuthorizationService
      .getAuthorizations(
        this.cookieService.getCookie(COOKIES.username),
        this.cookieService.getCookie(COOKIES.accessToken)
      )
      .subscribe(
        response => this.handleGetAuthorizationsResponse(response.body),
        error => this.handleErrorResponse(error)
      );
  }

  private handleUpdateReponse(response) {
    this.updated.emit(true);
  }

  private handleGetAuthorizationsResponse(groups: Group[]) {
    this.groups = groups;
  }

  private handleErrorResponse(error: HttpErrorResponse) {
    this.errorMessage = `Erreur : ${error.statusText}`;
  }
}
