import { TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { FormsModule } from '@angular/forms';
import { MockCookieService } from '../../../../../mocks/MockCookieService';
import { COOKIES } from '../../../../config/keys.config';
import { CookieService } from '../../../../services/browser/cookie.service';
import { AdminUserAuthorizationsComponent } from './user-authorizations.component';
import { AdminUserService } from '../../services/admin.user.service';
import { MockAdminUserService } from '../../../../../mocks/MockAdminUserService';
import { User } from '../../models/user.model';
import { Group } from '../../models/group.model';
import { MockAdminAuthorizationService } from '../../../../../mocks/MockAdminAuthorizationService';
import { AdminAuthorizationService } from '../../services/admin.authorization.service';
import { AdminUserAuthorizationComponent } from '../user-authorization/user-authorization.component';
import { MockRouter } from '../../../../../mocks/MockRouter';
import { Router } from '@angular/router';
import { MockAuthorizationService } from '../../../../../mocks/MockAuthorizationService';
import { AuthorizationService } from '../../../../services/authorization/authorization.service';

describe('modules/admin/components/user-authorizations/user-authorizations.component', () => {
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        AdminUserAuthorizationsComponent,
        AdminUserAuthorizationComponent
      ],
      providers: [
        { provide: Router, useClass: MockRouter },
        { provide: AuthorizationService, useClass: MockAuthorizationService },
        { provide: CookieService, useClass: MockCookieService },
        { provide: AdminUserService, useClass: MockAdminUserService },
        { provide: AdminAuthorizationService, useClass: MockAdminAuthorizationService }
      ]
    });
    TestBed.compileComponents();

    spyOn(MockCookieService.prototype, 'getCookie').and.callFake((name: string) => {
      if (name === COOKIES.username)
        return 'john@doe.fr';
      else
        return 'bbb';
    });
  }));

  describe('rendering', () => {
    it('should render users admin page', () => {
      const fixture = TestBed.createComponent(AdminUserAuthorizationsComponent);
      fixture.detectChanges();
      const component = fixture.nativeElement;
      expect(component.querySelector('h1').innerText).toBe('GESTION DES AUTORISATIONS UTILISATEUR');
    });
  });

  describe('initialization', () => {
    beforeEach(() => {
      spyOn(MockAdminUserService.prototype, 'getUsers').and.callFake((username: string, accessToken: string) => {
        const httpResponse: HttpResponse<User[]> = new HttpResponse({
          body: users,
          status: 200
        });

        return Observable.create(observer => observer.next(httpResponse));
      });
    });

    it('should get all users', () => {
      const fixture = TestBed.createComponent(AdminUserAuthorizationsComponent);
      const component: AdminUserAuthorizationsComponent = fixture.componentInstance;

      component.ngOnInit();

      expect(component.users).toEqual(users);
      expect(MockAdminUserService.prototype.getUsers).toHaveBeenCalledWith('john@doe.fr', 'bbb');
    });
  });
});
