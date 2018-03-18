import { Component, OnInit } from '@angular/core';
import { CookieService } from '../../../../services/browser/cookie.service';
import { Group } from '../../models/group.model';
import { COOKIES } from '../../../../config/keys.config';
import { HttpErrorResponse } from '@angular/common/http';
import { AdminUserService } from '../../services/admin.user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'sc-admin-user-authorizations',
  templateUrl: './user-authorizations.component.html',
  styleUrls: ['./user-authorizations.component.scss']
})
export class AdminUserAuthorizationsComponent implements OnInit {
  public users: User[];
  private errorMessage: string;

  constructor(
    private cookieService: CookieService,
    private adminUserService: AdminUserService
  ) { 
    this.users = [];
  }

  ngOnInit() {
    this.getUsers();
  }

  private getUsers() {
    this.adminUserService
      .getUsers(
        this.cookieService.getCookie(COOKIES.username),
        this.cookieService.getCookie(COOKIES.accessToken)
      )
      .subscribe(
        response => this.handleGetUsersResponse(response.body),
        error => this.handleErrorResponse(error)
      );
  }

  private handleUpdateUser(event) {
    this.getUsers();
  }

  private handleGetUsersResponse(users) {
    this.users = users;
  }

  private handleErrorResponse(error: HttpErrorResponse) {
    this.errorMessage = `Erreur : ${error.statusText}`;
  }
}
