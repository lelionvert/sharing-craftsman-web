import { Component, OnInit } from '@angular/core';
import { CookieService } from '../../../../services/browser/cookie.service';
import { Group } from '../../models/group.model';
import { COOKIES } from '../../../../config/keys.config';
import { HttpErrorResponse } from '@angular/common/http';
import { AdminUserService } from '../../services/admin.user.service';
import { User } from '../../models/user.model';
import { UserForm } from '../../forms/user.form';
import { Md5 } from 'ts-md5/dist/md5';
import { AuthorizationService } from '../../../../services/authorization/authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'sc-admin-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class AdminUsersComponent implements OnInit {
  public users: User[];
  public model: UserForm;
  private errorMessage: string;

  constructor(
    private router: Router,
    private authorizationService: AuthorizationService,
    private cookieService: CookieService,
    private adminUserService: AdminUserService
  ) {
    this.checkIfAdmin();
    this.users = [];
  }

  ngOnInit() {
    this.model = new UserForm('', '', '', '', '', '', '', '', true, true);
    this.getUsers();
  }

  validate() {
    if (this.model.isCreate) {
      this.createUser();
    } else {
      this.updateUser();
    }
  }

  cancel() {
    this.model = new UserForm('', '', '', '', '', '', '', '', true, true);
  }

  createUser() {
    this.adminUserService
      .createUser(
        this.cookieService.getCookie(COOKIES.username),
        this.cookieService.getCookie(COOKIES.accessToken),
        {
          username: this.model.username,
          password: Md5.hashStr(this.model.password).toString(),
          firstname: this.model.firstname,
          lastname: this.model.lastname,
          email: this.model.email,
          website: this.model.website,
          github: this.model.github,
          linkedin: this.model.linkedin,
          authorizations: this.model.authorizations,
          creationDate: 0,
          lastUpdateDate: 0,
          picture: '',
          active: true
        }
      )
      .subscribe(
        response => this.handleUserResponse(response),
        error => this.handleErrorResponse(error)
      );
  }

  updateUser() {
    this.adminUserService
      .updateUser(
        this.cookieService.getCookie(COOKIES.username),
        this.cookieService.getCookie(COOKIES.accessToken),
        {
          username: this.model.username,
          password: null,
          firstname: this.model.firstname,
          lastname: this.model.lastname,
          email: this.model.email,
          website: this.model.website,
          github: this.model.github,
          linkedin: this.model.linkedin,
          authorizations: this.model.authorizations,
          creationDate: 0,
          lastUpdateDate: 0,
          picture: '',
          active: true
        }
      )
      .subscribe(
        response => this.handleUserResponse(response),
        error => this.handleErrorResponse(error)
      );
  }

  private handleEditUser(event) {
    const userToEdit = this.users.find(user => user.username === event);
    this.model = new UserForm(
      userToEdit.username,
      userToEdit.password,
      userToEdit.firstname,
      userToEdit.lastname,
      userToEdit.email,
      userToEdit.website,
      userToEdit.github,
      userToEdit.linkedin,
      true,
      false,
      userToEdit.authorizations
    );
  }

  private handleDeleteUser(event) {
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

  private handleUserResponse(response) {
    this.getUsers();
  }

  private handleGetUsersResponse(users) {
    this.users = users;
  }

  private handleErrorResponse(error: HttpErrorResponse) {
    this.errorMessage = `Erreur : ${error.statusText}`;
  }

  private checkIfAdmin() {
    this.authorizationService
      .getRoles()
      .subscribe(response => this.handleGetRolesResponse(response.body))
  }

  private handleGetRolesResponse(groups) {
    let isAdmin = false;
    
    groups.groups.forEach(group => {
      const hasAdminRole = group.roles.findIndex(role => role.name === 'ROLE_ADMIN');
      if (hasAdminRole !== -1) {
        isAdmin = true;
      }
    });

    if (!isAdmin)
      this.router.navigateByUrl('/');
  }
}
