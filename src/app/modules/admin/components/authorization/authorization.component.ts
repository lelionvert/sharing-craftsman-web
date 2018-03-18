import { Component, OnInit } from '@angular/core';
import { CookieService } from '../../../../services/browser/cookie.service';
import { Group } from '../../models/group.model';
import { Authorization } from '../../forms/authorization.form';
import { AdminAuthorizationService } from '../../services/admin.authorization.service';
import { COOKIES } from '../../../../config/keys.config';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'sc-admin-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AdminAuthorizationComponent implements OnInit {
  public groups: Group[];
  public model: Authorization;
  private errorMessage: string;

  constructor(
    private cookieService: CookieService,
    private adminAuthorizationService: AdminAuthorizationService
  ) {
    this.model = new Authorization('', '');
  }

  ngOnInit() {
    this.getAuthorizations();
  }

  onSelectGroup(group) {
    this.model.group = group;
  }

  onTypeNewGroup(group) {
    this.model.group = group;
  }

  create() {
    this.adminAuthorizationService
      .createAuthorization(
        this.cookieService.getCookie(COOKIES.username),
        this.cookieService.getCookie(COOKIES.accessToken),
        {
          name: this.model.group,
          roles: [{ name: this.model.role }]
        }
      )
      .subscribe(
        response => this.handleCreateAuthorizationResponse(response),
        error => this.handleErrorResponse(error)
      );
  }

  cancel() {
    this.model = new Authorization('', '');
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

  private handleDeleteAuthorization(success) {
    this.getAuthorizations();
  }

  private handleCreateAuthorizationResponse(response) {
    this.getAuthorizations();
  }

  private handleGetAuthorizationsResponse(groups: Group[]) {
    this.groups = groups;
  }

  private handleErrorResponse(error: HttpErrorResponse) {
    this.errorMessage = `Erreur : ${error.statusText}`;
  }
}
