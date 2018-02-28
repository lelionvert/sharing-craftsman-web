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
export class LogoutService {
  constructor(
    private http: HttpClient, 
    private headerService: HeaderService,
    private cookieService: CookieService
  ) {}

  logout() {
    const headers = this.headerService
      .buildHeaders()
      .withClientName(CLIENT_NAME)
      .withClientSecret(CLIENT_SECRET)
      .withUsername(this.cookieService.getCookie(COOKIES.username))
      .withAccessToken(this.cookieService.getCookie(COOKIES.token))
      .get();

    this.cookieService.deleteCookie(COOKIES.username);
    this.cookieService.deleteCookie(COOKIES.token);
    this.cookieService.deleteCookie(COOKIES.refreshToken);

    return this.http.get(`${HOST}/${BACK_END_ROUTES.user.logout}`, { observe: 'response', headers: headers });
  }
}
