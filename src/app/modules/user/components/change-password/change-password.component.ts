import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';

import { Login } from '../../forms/login.form';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangePassword } from '../../forms/change-password.form';
import { CookieService } from '../../../../services/browser/cookie.service';
import { COOKIES } from '../../../../config/keys.config';

@Component({
  selector: 'sc-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  public model: ChangePassword;
  public errorMessage: string;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private userService: UserService
  ) {
    this.model = new ChangePassword('', '');
  }

  changePassword() {
    this.userService
      .requestChangePasswordToken(this.cookieService.getCookie(COOKIES.username), this.cookieService.getCookie(COOKIES.token))
      .subscribe(
        response => this.handleRequestTokenResponse(response),
        error => this.handleErrorResponse(error)
      );
  }

  private handleRequestTokenResponse(response) {
    this.userService
      .changePassword(
        this.cookieService.getCookie(COOKIES.username), 
        this.cookieService.getCookie(COOKIES.token),
        response.body.token,
        this.model.oldPassword,
        this.model.newPassword
      )
      .subscribe(
        response => this.handleChangePasswordResponse(response),
        error => this.handleErrorResponse(error)
      );
  }

  private handleChangePasswordResponse(response) {
    this.cookieService.deleteCookie(COOKIES.username);
    this.cookieService.deleteCookie(COOKIES.token);
    this.cookieService.deleteCookie(COOKIES.refreshToken);
    this.router.navigateByUrl('/login');
  }

  private handleErrorResponse(error: HttpErrorResponse) {
    this.errorMessage = `Erreur lors de la création de compte : ${error.statusText}`;
  }
}
