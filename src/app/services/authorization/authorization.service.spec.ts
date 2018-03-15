import { MockBackend } from '@angular/http/testing';
import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject, async } from '@angular/core/testing';

import { HeaderService } from '../browser/header.service';
import { CookieService } from '../browser/cookie.service';
import { HOST, BACK_END_ROUTES } from '../../config/api.config';
import { COOKIES } from '../../config/keys.config';
import { AuthorizationService } from './authorization.service';

describe('services/authorization/authorization.service', () => {
  let service: AuthorizationService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthorizationService,
        HeaderService,
        CookieService
      ]
    });

    service = TestBed.get(AuthorizationService);
    httpMock = TestBed.get(HttpTestingController);

    spyOn(CookieService.prototype, 'getCookie').and.callFake((name: string) => {
      if (name === COOKIES.username)
        return 'john@doe.fr';
      else
        return 'aaa';
    });
  }));

  afterEach(() => {
    httpMock.verify();
  });

  it('should get roles of user', () => {
    const mockRoles = {
      groups: [
        {
          roles: [{ name: "ROLE_USER" }],
          name: "USERS"
        },
        {
          name: "ADMINS",
          roles: [
            { name: "ROLE_USER" },
            { name: "ROLE_ADMIN"}
          ]
        }
      ]
    }

    service.getRoles().subscribe(response => {
      expect(response.body).toEqual(mockRoles)
      expect(response.status).toEqual(200);
    });

    const req = httpMock.expectOne(`${HOST}/${BACK_END_ROUTES.authorization.roles}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockRoles);
  });

  it('should check if user is connected', () => {
    service.isAuthenticated().subscribe(response => {
      expect(response.status).toEqual(200);
    });

    const req = httpMock.expectOne(`${HOST}/${BACK_END_ROUTES.authorization.verifyToken}`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });
});
