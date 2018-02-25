import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';

import { Login } from '../../forms/login.form';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LostPassword } from '../../forms/lost-password.form';

@Component({
  selector: 'sc-lost-password',
  templateUrl: './lost-password.component.html',
  styleUrls: ['./lost-password.component.scss']
})
export class LostPasswordComponent {
  public usernameModel: Login;
  public lostPasswordModel: LostPassword;
  public lostPasswordToken: string;
  public errorMessage: string;

  constructor(
    private router: Router,
    private userService: UserService
  ) {
    this.usernameModel = new Login();
    this.lostPasswordModel = new LostPassword('', '', '');
    this.lostPasswordToken = '';
  }

  requestLostPasswordToken() {
    this.userService
      .requestLostPasswordToken(this.usernameModel.username)
      .subscribe(
        response => this.handleRequestTokenResponse(response),
        error => this.handleErrorResponse(error)
      );
  }

  changePassword() {
    this.userService
      .changeLostPassword(this.usernameModel.username, this.lostPasswordModel.token, this.lostPasswordModel.newPassword)
      .subscribe(
        response => this.handleChangePasswordResponse(response),
        error => this.handleErrorResponse(error)
      );
  }

  private validatePassword() {
    return this.lostPasswordModel.newPassword === this.lostPasswordModel.repeatPassword
  }


  private handleRequestTokenResponse(response) {
    this.requestLostPasswordToken = response.body.changePasswordToken.token;
  }

  private handleChangePasswordResponse(response) {
    this.router.navigateByUrl('/login');
  }

  private handleErrorResponse(error: HttpErrorResponse) {
    this.errorMessage = `Erreur lors de la création de compte : ${error.statusText}`;
  }
}
