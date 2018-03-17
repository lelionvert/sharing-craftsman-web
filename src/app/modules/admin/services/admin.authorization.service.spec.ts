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
import { AdminAuthorizationService } from './admin.authorization.service';

describe('modules/admin/services/admin.authorization.service', () => {
  let service: AdminAuthorizationService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AdminAuthorizationService,
        HeaderService
      ]
    });

    service = TestBed.get(AdminAuthorizationService);
    httpMock = TestBed.get(HttpTestingController);
  }));

  afterEach(() => {
    httpMock.verify();
  });

  it('should get all groups and roles', () => {
    const groups: Group[] = [
      {
        name: "USERS",
        roles: [
          {
            name: "ROLE_USER"
          }
        ]
      },
      {
        name: "ADMINS",
        roles: [
          {
            name: "ROLE_USER"
          },
          {
            name: "ROLE_ADMIN"
          }
        ]
      }
    ];

    service.getAuthorizations('john@doe.fr', 'aaa').subscribe(response => {
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(groups);
    });

    const req = httpMock.expectOne(`${HOST}/${BACK_END_ROUTES.admin.groups}`);
    expect(req.request.method).toBe('GET');
    req.flush(groups);
  });

  it('should create an authorization group with role', () => {
    const group: Group = {
      name: "ADMINS",
      roles: [
        {
          name: "ROLE_ROOT"
        }
      ]
    };

    service.createAuthorization('john@doe.fr', 'aaa', group).subscribe(response => {
      expect(response.status).toEqual(200);
    });

    const req = httpMock.expectOne(`${HOST}/${BACK_END_ROUTES.admin.groups}`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should delete an authorization role from group', () => {
    const group: Group = {
      name: "SUPER_ADMINS",
      roles: [
        {
          name: "ROLE_ROOT"
        }
      ]
    };

    service.deleteAuthorization('john@doe.fr', 'aaa', group).subscribe(response => {
      expect(response.status).toEqual(200);
    });

    const req = httpMock.expectOne(`${HOST}/${BACK_END_ROUTES.admin.deleteRole}`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });
});
