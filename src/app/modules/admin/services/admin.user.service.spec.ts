import { MockBackend } from '@angular/http/testing';
import {
  HttpClient,
  HttpResponse
} from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject, async } from '@angular/core/testing';
import { HeaderService } from '../../../services/browser/header.service';
import { HOST, HEADERS, BACK_END_ROUTES } from '../../../config/api.config';
import { Group } from '../models/group.model';
import { AdminUserService } from './admin.user.service';
import { User } from '../models/user.model';
import { UserAuthorization } from '../models/user.authorization.model';

describe('modules/admin/services/admin.authorization.service', () => {
  let service: AdminUserService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AdminUserService,
        HeaderService
      ]
    });

    service = TestBed.get(AdminUserService);
    httpMock = TestBed.get(HttpTestingController);
  }));

  afterEach(() => {
    httpMock.verify();
  });

  it('should get all users', () => {
    const users: User[] = [
      {
        "username": "john@doe.fr",
        "password": "password",
        "firstname": "John",
        "lastname": "Doe",
        "email": "john@doe.fr",
        "website": "www.johndoe.fr",
        "github": "github.com/johndoe",
        "linkedin": "linkedin.com/johndoe",
        "authorizations": {
          "groups": [
            {
              "roles": [
                {
                  "name": "ROLE_USER"
                }
              ],
              "name": "USERS"
            }
          ]
        },
        "creationDate": 1514631600000,
        "lastUpdateDate": 1514631600000,
        "picture": "picture.jpg",
        "active": true
      },
      {
        "username": "admin@toto.fr",
        "password": "password",
        "firstname": "Admin",
        "lastname": "Toto",
        "email": "admin@toto.fr",
        "website": "www.admintoto.fr",
        "github": "github.com/admintoto",
        "linkedin": "linkedin.com/admintoto",
        "authorizations": {
          "groups": [
            {
              "roles": [
                {
                  "name": "ROLE_USER"
                },
                {
                  "name": "ROLE_ADMIN"
                }
              ],
              "name": "ADMINS"
            }
          ]
        },
        "creationDate": 1514631600000,
        "lastUpdateDate": 1514631600000,
        "picture": "picture.jpg",
        "active": true
      }
    ];

    service.getUsers('john@doe.fr', 'aaa').subscribe(response => {
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(users);
    });

    const req = httpMock.expectOne(`${HOST}/${BACK_END_ROUTES.admin.users}`);
    expect(req.request.method).toBe('GET');
    req.flush(users);
  });

  it('should create a user', () => {
    const user: User = {
      "username": "admin@toto.fr",
      "password": "password",
      "firstname": "John",
      "lastname": "Doe",
      "email": "admin@toto.fr",
      "website": "www.admintoto.fr",
      "github": "github.com/admintoto",
      "linkedin": "linkedin.com/admintoto",
      "authorizations": {
        "groups": [
          {
            "roles": [
              {
                "name": "ROLE_USER"
              },
              {
                "name": "ROLE_ADMIN"
              }
            ],
            "name": "ADMINS"
          }
        ]
      },
      "creationDate": 1514631600000,
      "lastUpdateDate": 1514631600000,
      "picture": "picture.jpg",
      "active": true
    };

    service.createUser('john@doe.fr', 'aaa', user).subscribe(response => {
      expect(response.status).toEqual(200);
    });

    const req = httpMock.expectOne(`${HOST}/${BACK_END_ROUTES.admin.users}`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should update a user', () => {
    const user: User = {
      "username": "admin@toto.fr",
      "password": "password",
      "firstname": "John",
      "lastname": "Doe",
      "email": "admin@toto.fr",
      "website": "www.admintoto.fr",
      "github": "github.com/admintoto",
      "linkedin": "linkedin.com/admintoto",
      "authorizations": {
        "groups": [
          {
            "roles": [
              {
                "name": "ROLE_USER"
              },
              {
                "name": "ROLE_ADMIN"
              }
            ],
            "name": "ADMINS"
          }
        ]
      },
      "creationDate": 1514631600000,
      "lastUpdateDate": 1514631600000,
      "picture": "picture.jpg",
      "active": true
    };

    service.updateUser('john@doe.fr', 'aaa', user).subscribe(response => {
      expect(response.status).toEqual(200);
    });

    const req = httpMock.expectOne(`${HOST}/${BACK_END_ROUTES.admin.users}`);
    expect(req.request.method).toBe('PUT');
    req.flush({});
  });

  it('should delete a user', () => {
    service.deleteUser('john@doe.fr', 'aaa', 'john@doe.fr').subscribe(response => {
      expect(response.status).toEqual(200);
    });

    const req = httpMock.expectOne(`${HOST}/${BACK_END_ROUTES.admin.users}/john@doe.fr`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should add a group to a user', () => {
    const userAuthorization: UserAuthorization = {
      "username": "hello@world.fr",
      "group": "USERS"
    };

    service.addGroupToUser('john@doe.fr', 'aaa', userAuthorization).subscribe(response => {
      expect(response.status).toEqual(200);
    });

    const req = httpMock.expectOne(`${HOST}/${BACK_END_ROUTES.admin.userAuthorizations}`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should remove a group from a user', () => {
    const userAuthorization: UserAuthorization = {
      "username": "hello@world.fr",
      "group": "USERS"
    };

    service.removeGroupFromUser('john@doe.fr', 'aaa', userAuthorization).subscribe(response => {
      expect(response.status).toEqual(200);
    });

    const req = httpMock.expectOne(`${HOST}/${BACK_END_ROUTES.admin.deleteUserAuthorization}`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });
});
