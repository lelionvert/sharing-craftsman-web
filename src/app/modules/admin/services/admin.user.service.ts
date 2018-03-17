import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Md5 } from 'ts-md5/dist/md5';

import { HeaderService } from '../../../services/browser/header.service';
import { CLIENT_NAME, CLIENT_SECRET } from '../../../config/keys.config';
import { HOST, BACK_END_ROUTES } from '../../../config/api.config';
import { User } from '../models/user.model';
import { UserAuthorization } from '../models/user.authorization.model';

@Injectable()
export class AdminUserService {
  constructor(private http: HttpClient, private headerService: HeaderService) { }

  getUsers(username: string, accessToken: string): Observable<HttpResponse<User[]>> {
    return this.http.get<User[]>(
      `${HOST}/${BACK_END_ROUTES.admin.users}`,
      { observe: 'response', headers: this.getUserHeaders(username, accessToken) }
    )
  }

  createUser(username: string, accessToken: string, user: User) {
    user.password = Md5.hashStr(user.password).toString();
    return this.http.post(
      `${HOST}/${BACK_END_ROUTES.admin.users}`,
      user,
      { observe: 'response', headers: this.getUserHeaders(username, accessToken) }
    );
  }

  updateUser(username: string, accessToken: string, user: User) {
    user.password = Md5.hashStr(user.password).toString();
    return this.http.put(
      `${HOST}/${BACK_END_ROUTES.admin.users}`,
      user,
      { observe: 'response', headers: this.getUserHeaders(username, accessToken) }
    );
  }

  deleteUser(username: string, accessToken: string, usernameToDelete: string) {
    return this.http.delete(
      `${HOST}/${BACK_END_ROUTES.admin.users}/${usernameToDelete}`,
      { observe: 'response', headers: this.getUserHeaders(username, accessToken) }
    );
  }

  addGroupToUser(username: string, accessToken: string, userAuthorization: UserAuthorization) {
    return this.http.post(
      `${HOST}/${BACK_END_ROUTES.admin.userAuthorizations}`,
      userAuthorization,
      { observe: 'response', headers: this.getUserHeaders(username, accessToken) }
    );
  }

  removeGroupFromUser(username: string, accessToken: string, userAuthorization: UserAuthorization) {
    return this.http.post(
      `${HOST}/${BACK_END_ROUTES.admin.deleteUserAuthorization}`,
      userAuthorization,
      { observe: 'response', headers: this.getUserHeaders(username, accessToken) }
    );
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
}