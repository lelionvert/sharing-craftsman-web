import { TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { FormsModule } from '@angular/forms';
import { MockCookieService } from '../../../../../mocks/MockCookieService';
import { COOKIES } from '../../../../config/keys.config';
import { CookieService } from '../../../../services/browser/cookie.service';
import { AdminUserService } from '../../services/admin.user.service';
import { MockAdminUserService } from '../../../../../mocks/MockAdminUserService';
import { User } from '../../models/user.model';
import { Group } from '../../models/group.model';
import { MockAdminAuthorizationService } from '../../../../../mocks/MockAdminAuthorizationService';
import { AdminAuthorizationService } from '../../services/admin.authorization.service';
import { UserAuthorization } from '../../models/user.authorization.model';
import { EmptyResponse } from '../../../../utils/empty-response.model';
import { AdminUserAuthorizationComponent } from './user-authorization.component';
import { Authorization } from '../../forms/authorization.form';

describe('modules/admin/components/user-authorization/users-authorization.component', () => {
  const user: User = {
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
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        AdminUserAuthorizationComponent
      ],
      providers: [
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

  describe('initialization', () => {
    beforeEach(() => {
      spyOn(MockAdminAuthorizationService.prototype, 'getAuthorizations').and.callFake((username: string, accessToken: string) => {
        const httpResponse: HttpResponse<Group[]> = new HttpResponse({
          body: [
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
          ],
          status: 200
        });

        return Observable.create(observer => observer.next(httpResponse));
      });
    });

    it('should get all groups', () => {
      const fixture = TestBed.createComponent(AdminUserAuthorizationComponent);
      const authorizationComponent: AdminUserAuthorizationComponent = fixture.componentInstance;

      authorizationComponent.ngOnInit();

      expect(authorizationComponent.groups).toEqual([
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
      ]);
      expect(MockAdminAuthorizationService.prototype.getAuthorizations).toHaveBeenCalledWith('john@doe.fr', 'bbb');
    });
  });

  describe('groups management', () => {
    beforeEach(() => {
      spyOn(MockAdminUserService.prototype, 'addGroupToUser').and.callFake((username: string, accessToken: string, userAuthorization: UserAuthorization) => {
        const httpResponse: HttpResponse<EmptyResponse> = new HttpResponse({
          status: 200
        });

        return Observable.create(observer => observer.next(httpResponse));
      });

      spyOn(MockAdminUserService.prototype, 'removeGroupFromUser').and.callFake((username: string, accessToken: string, userAuthorization: UserAuthorization) => {
        const httpResponse: HttpResponse<EmptyResponse> = new HttpResponse({
          status: 200
        });

        return Observable.create(observer => observer.next(httpResponse));
      });
    });

    it('should add group to user', () => {
      const fixture = TestBed.createComponent(AdminUserAuthorizationComponent);
      const authorizationComponent: AdminUserAuthorizationComponent = fixture.componentInstance;
      authorizationComponent.user = user;
      authorizationComponent.model = new Authorization('ADMINS', '');

      authorizationComponent.addGroup();

      expect(MockAdminUserService.prototype.addGroupToUser).toHaveBeenCalledWith('john@doe.fr', 'bbb', { username: 'john@doe.fr', group: 'ADMINS' });
    });

    it('should remove group from user', () => {
      const fixture = TestBed.createComponent(AdminUserAuthorizationComponent);
      const authorizationComponent: AdminUserAuthorizationComponent = fixture.componentInstance;
      authorizationComponent.user = user;

      authorizationComponent.onClickDelete('ADMINS');

      expect(MockAdminUserService.prototype.removeGroupFromUser).toHaveBeenCalledWith('john@doe.fr', 'bbb', { username: 'john@doe.fr', group: 'ADMINS' });
    });
  });
});
