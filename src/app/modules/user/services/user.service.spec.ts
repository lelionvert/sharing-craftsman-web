import { MockBackend } from '@angular/http/testing';
import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject, async } from '@angular/core/testing';
import { UserService } from './user.service';
import { HeaderService } from '../../../services/browser/header.service';
import { HOST, HEADERS, BACK_END_ROUTES } from '../../../config/api.config';

describe('user service', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserService,
        HeaderService
      ]
    });

    service = TestBed.get(UserService);
    httpMock = TestBed.get(HttpTestingController);
  }));

  afterEach(() => {
    httpMock.verify();
  });

  it('should return resources', () => {
    const dummyLogins = [
      { username: 'john@doe.fr', password: 'password' },
      { username: 'foo@bar.fr', password: 'password', persistentLogging: true }
    ];

    service.getLogins('john@doe.fr', 'password').subscribe(logins => {
      expect(logins.status).toEqual(200);
      expect(logins.body).toEqual(dummyLogins);
    });

    const req = httpMock.expectOne(`${HOST}/logins`);
    expect(req.request.method).toBe("GET");
    req.flush(dummyLogins);
  });

  it('should return token when login', () => {
    const fakeToken = {
      username: 'john@doe.fr',
      accessToken: 'aaa',
      refreshToken: 'bbb',
      expirationDate: 1514631600000
    };

    service.login('john@doe.fr', 'password', false).subscribe(response => {
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(fakeToken);
    });

    const req = httpMock.expectOne(`${HOST}/${BACK_END_ROUTES.user.login}`);
    expect(req.request.method).toBe('POST');
    req.flush(fakeToken);
  });
});
