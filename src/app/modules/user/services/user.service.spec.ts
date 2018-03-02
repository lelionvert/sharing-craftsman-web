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

describe('modules/user/services/user.service', () => {
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

  it('should return ok when registering', () => {
    service.register('john@doe.fr', 'password').subscribe(response => {
      expect(response.status).toEqual(200);
    });

    const req = httpMock.expectOne(`${HOST}/${BACK_END_ROUTES.user.register}`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should send request to change password', () => {
    service.requestChangePasswordToken('john@doe.fr', 'aaa').subscribe(response => {
      expect(response.status).toEqual(200);
      expect(response.body).toEqual({ token: 'aaa' })
    });

    const req = httpMock.expectOne(`${HOST}/${BACK_END_ROUTES.user.requestChangePassword}`);
    expect(req.request.method).toBe('GET');
    req.flush({
      token: 'aaa'
    });
  });

  it('should send change password request', () => {
    service.changePassword('john@doe.fr', 'aaa', 'changepasstoken', 'password', 'newPassword').subscribe(response => {
      expect(response.status).toEqual(200);
    });

    const req = httpMock.expectOne(`${HOST}/${BACK_END_ROUTES.user.changePassword}`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should send update profile request', () => {
    service.updateProfile(
      'john@doe.fr',
      'aaa',
      {
        "firstname": "John",
        "lastname": "Doe",
        "email": "john@doe.fr",
        "website": "www.johndoe.fr",
        "github": "http://github.com/Johndoe",
        "linkedin": "linkedin.com/johndoe",
        "picture": "picture.jpg"
      }
    ).subscribe(response => {
      expect(response.status).toEqual(200);
    });

    const req = httpMock.expectOne(`${HOST}/${BACK_END_ROUTES.user.updateProfile}`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should send request for lost password token', () => {
    const lostPasswordToken = {
      changePasswordToken: {
        token: 'aaa'
      },
      email: {
        email: 'john@doe.fr'
      }
    };

    service.requestLostPasswordToken('john@doe.fr').subscribe(response => {
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(lostPasswordToken)
    });

    const req = httpMock.expectOne(`${HOST}/${BACK_END_ROUTES.user.requestLostPasswordToken}`);
    expect(req.request.method).toBe('GET');
    req.flush(lostPasswordToken);
  });

  it('should send change lost password request', () => {
    service.changeLostPassword('john@doe.fr', 'changepasstoken', 'newPassword').subscribe(response => {
      expect(response.status).toEqual(200);
    });

    const req = httpMock.expectOne(`${HOST}/${BACK_END_ROUTES.user.changeLostPassword}`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should send request to get a new access token from refresh token', () => {
    const newAccessToken = {
      username: 'john@doe.fr',
      accessToken: 'aaa',
      refreshToken: 'bbb',
      expirationDate: 1514631600000
    };

    service.refreshToken('john@doe.fr', 'bbb').subscribe(response => {
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(newAccessToken)
    });

    const req = httpMock.expectOne(`${HOST}/${BACK_END_ROUTES.user.refreshToken}`);
    expect(req.request.method).toBe('GET');
    req.flush(newAccessToken);
  });
});
