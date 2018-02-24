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
      { observe: 'response', headers: this.getHeaders() }
    );
  }

  getLogins(username: string, password: string): Observable<HttpResponse<Login[]>> {
    return this.http.get<Login[]>(`${HOST}/logins`, { observe: 'response', headers: this.getHeaders() });
  }

  private getHeaders() {
    return this.headerService
      .buildHeaders()
      .withClientName(CLIENT_NAME)
      .withClientSecret(CLIENT_SECRET)
      .get();
  }
}
