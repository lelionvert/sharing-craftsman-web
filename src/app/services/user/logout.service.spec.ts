import { MockBackend } from '@angular/http/testing';
import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject, async } from '@angular/core/testing';

import { LogoutService } from './logout.service';
import { HeaderService } from '../browser/header.service';
import { CookieService } from '../browser/cookie.service';
import { HOST, BACK_END_ROUTES } from '../../config/api.config';
import { COOKIES } from '../../config/keys.config';

describe('services/user/logout.service', () => {
  let service: LogoutService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        LogoutService,
        HeaderService,
        CookieService
      ]
    });

    service = TestBed.get(LogoutService);
    httpMock = TestBed.get(HttpTestingController);

    spyOn(CookieService.prototype, 'deleteCookie');
  }));

  afterEach(() => {
    httpMock.verify();
  });

  it('should disconnect user', () => {
    service.logout().subscribe(response => {
      expect(response.status).toEqual(200);
    });

    const req = httpMock.expectOne(`${HOST}/${BACK_END_ROUTES.user.logout}`);
    expect(req.request.method).toBe('GET');
    req.flush({});
    expect(CookieService.prototype.deleteCookie).toHaveBeenCalledWith(COOKIES.username);
    expect(CookieService.prototype.deleteCookie).toHaveBeenCalledWith(COOKIES.token);
    expect(CookieService.prototype.deleteCookie).toHaveBeenCalledWith(COOKIES.refreshToken);
  });
});
