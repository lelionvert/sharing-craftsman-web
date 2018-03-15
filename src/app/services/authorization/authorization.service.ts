import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { CLIENT_NAME, CLIENT_SECRET, COOKIES } from '../../config/keys.config';
import { HOST, BACK_END_ROUTES } from '../../config/api.config';
import { HeaderService } from '../browser/header.service';
import { CookieService } from '../browser/cookie.service';

@Injectable()
export class AuthorizationService {
  constructor(
    private http: HttpClient,
    private headerService: HeaderService,
    private cookieService: CookieService
  ) { }

  getRoles() {
    const headers = this.headerService
      .buildHeaders()
      .withClientName(CLIENT_NAME)
      .withClientSecret(CLIENT_SECRET)
      .withUsername(this.cookieService.getCookie(COOKIES.username))
      .withAccessToken(this.cookieService.getCookie(COOKIES.token))
      .get();

    return this.http.get(`${HOST}/${BACK_END_ROUTES.authorization.roles}`, { observe: 'response', headers: headers });
  }

  isAuthenticated() {
    const headers = this.headerService
      .buildHeaders()
      .withClientName(CLIENT_NAME)
      .withClientSecret(CLIENT_SECRET)
      .withUsername(this.cookieService.getCookie(COOKIES.username))
      .withAccessToken(this.cookieService.getCookie(COOKIES.token))
      .get();

    return this.http.get(`${HOST}/${BACK_END_ROUTES.authorization.verifyToken}`, { observe: 'response', headers: headers });
  }
}
