import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Login } from '../models/login.model';
import { HOST, HEADERS, BACK_END_ROUTES } from '../../../config/api.config';
import { CLIENT_NAME, CLIENT_SECRET } from '../../../config/keys.config';
import { HeaderService } from '../../../services/browser/header.service';
import { AccessToken } from '../models/access-token.model';
import { ChangePasswordToken } from '../models/change-password-token.model';
import { LostPasswordToken } from '../models/lost-password-token.model';

@Injectable()
export class UserService {
  constructor(private http: HttpClient, private headerService: HeaderService) { }

  login(username: string, password: string, persistentLogging: boolean): Observable<HttpResponse<AccessToken>> {
    return this.http.post<AccessToken>(
      `${HOST}/${BACK_END_ROUTES.user.login}`,
      {
        username: username,
        password: password,
        persistentLogging: persistentLogging
      },
      { observe: 'response', headers: this.getClientHeaders() }
    );
  }

  register(username: string, password: string) {
    return this.http.post(
      `${HOST}/${BACK_END_ROUTES.user.register}`,
      {
        username: username,
        password: password,
      },
      { observe: 'response', headers: this.getClientHeaders() }
    );
  }

  requestChangePasswordToken(username: string, accessToken: string): Observable<HttpResponse<ChangePasswordToken>> {
    return this.http.get<ChangePasswordToken>(
      `${HOST}/${BACK_END_ROUTES.user.requestChangePassword}`,
      { observe: 'response', headers: this.getUserHeaders(username, accessToken) }
    )
  }

  changePassword(username: string, accessToken: string, changePasswordToken: string, oldPassword: string, newPassword: string) {
    return this.http.post(
      `${HOST}/${BACK_END_ROUTES.user.changePassword}`,
      {
        changePasswordToken: changePasswordToken,
        oldPassword: oldPassword,
        newPassword: newPassword
      },
      { observe: 'response', headers: this.getUserHeaders(username, accessToken) }
    );
  }

  updateProfile(username: string, accessToken: string, profileInfo: any) {
    return this.http.post(
      `${HOST}/${BACK_END_ROUTES.user.updateProfile}`,
      profileInfo,
      { observe: 'response', headers: this.getUserHeaders(username, accessToken) }
    );
  }

  requestLostPasswordToken(username: string): Observable<HttpResponse<LostPasswordToken>> {
    return this.http.get<LostPasswordToken>(
      `${HOST}/${BACK_END_ROUTES.user.requestLostPasswordToken}`,
      { observe: 'response', headers: this.getUsernameHeaders(username) }
    )
  }

  changeLostPassword(username: string, changePasswordToken: string, newPassword: string) {
    return this.http.post(
      `${HOST}/${BACK_END_ROUTES.user.changeLostPassword}`,
      {
        changePasswordToken: changePasswordToken,
        newPassword: newPassword
      },
      { observe: 'response', headers: this.getUsernameHeaders(username) }
    );
  }

  private getClientHeaders() {
    return this.headerService
      .buildHeaders()
      .withClientName(CLIENT_NAME)
      .withClientSecret(CLIENT_SECRET)
      .get();
  }

  private getUserHeaders(username: string, token: string) {
    return this.headerService
      .buildHeaders()
      .withClientName(CLIENT_NAME)
      .withClientSecret(CLIENT_SECRET)
      .withUsername(username)
      .withAccessToken(token)
      .get();
  }

  private getUsernameHeaders(username: string) {
    return this.headerService
      .buildHeaders()
      .withClientName(CLIENT_NAME)
      .withClientSecret(CLIENT_SECRET)
      .withUsername(username)
      .get();
  }
}
