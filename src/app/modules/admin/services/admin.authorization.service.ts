import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { HeaderService } from '../../../services/browser/header.service';
import { CLIENT_NAME, CLIENT_SECRET } from '../../../config/keys.config';
import { HOST, BACK_END_ROUTES } from '../../../config/api.config';
import { Group } from '../models/group.model';

@Injectable()
export class AdminAuthorizationService {
  constructor(private http: HttpClient, private headerService: HeaderService) { }

  getAuthorizations(username: string, accessToken: string): Observable<HttpResponse<Group[]>> {
    return this.http.get<Group[]>(
      `${HOST}/${BACK_END_ROUTES.admin.groups}`,
      { observe: 'response', headers: this.getUserHeaders(username, accessToken) }
    )
  }

  createAuthorization(username: string, accessToken: string, group: Group) {
    return this.http.post(
      `${HOST}/${BACK_END_ROUTES.admin.groups}`,
      group,
      { observe: 'response', headers: this.getUserHeaders(username, accessToken) }
    );
  }

  deleteAuthorization(username: string, accessToken: string, group: Group) {
    return this.http.post(
      `${HOST}/${BACK_END_ROUTES.admin.deleteRole}`,
      group,
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