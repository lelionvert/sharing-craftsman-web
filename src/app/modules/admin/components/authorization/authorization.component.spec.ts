import { TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { FormsModule } from '@angular/forms';
import { MockCookieService } from '../../../../../mocks/MockCookieService';
import { COOKIES } from '../../../../config/keys.config';
import { CookieService } from '../../../../services/browser/cookie.service';
import { AdminAuthorizationComponent } from './authorization.component';
import { MockAdminAuthorizationService } from '../../../../../mocks/MockAdminAuthorizationService';
import { Group } from '../../models/group.model';
import { AdminAuthorizationService } from '../../services/admin.authorization.service';
import { AuthorizationGroupComponent } from '../authorization-group/authorization-group.component';
import { AuthorizationRoleComponent } from '../authorization-role/authorization-role.component';
import { EmptyResponse } from '../../../../utils/empty-response.model';
import { Authorization } from '../../forms/authorization.form';

describe('modules/admin/components/authorization/authorization.component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        AdminAuthorizationComponent,
        AuthorizationGroupComponent,
        AuthorizationRoleComponent
      ],
      providers: [
        { provide: CookieService, useClass: MockCookieService },
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
    it('should render authorization admin page', () => {
      const fixture = TestBed.createComponent(AdminAuthorizationComponent);
      fixture.detectChanges();
      const authorizationComponent = fixture.nativeElement;
      expect(authorizationComponent.querySelector('h1').innerText).toBe('AUTORISATIONS');
    });
  });

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
      const fixture = TestBed.createComponent(AdminAuthorizationComponent);
      const authorizationComponent: AdminAuthorizationComponent = fixture.componentInstance;
      
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

  describe('authorization creation', () => {
    beforeEach(() => {
      spyOn(MockAdminAuthorizationService.prototype, 'createAuthorization').and.callFake((username: string, accessToken: string, group: Group) => {
        const httpResponse: HttpResponse<EmptyResponse> = new HttpResponse({
          status: 200
        });

        return Observable.create(observer => observer.next(httpResponse));
      });
    });

    it('should create a new authorization', () => {
      const fixture = TestBed.createComponent(AdminAuthorizationComponent);
      const authorizationComponent: AdminAuthorizationComponent = fixture.componentInstance;
      authorizationComponent.model = new Authorization('group', 'role');

      authorizationComponent.create();

      expect(MockAdminAuthorizationService.prototype.createAuthorization).toHaveBeenCalledWith('john@doe.fr', 'bbb', { name: 'group', roles: [{ name: 'role' }]});
    });
  });
});
