import { TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { FormsModule } from '@angular/forms';
import { MockCookieService } from '../../../../../mocks/MockCookieService';
import { COOKIES } from '../../../../config/keys.config';
import { CookieService } from '../../../../services/browser/cookie.service';
import { AuthorizationRoleComponent } from './authorization-role.component';
import { AdminAuthorizationService } from '../../services/admin.authorization.service';
import { MockAdminAuthorizationService } from '../../../../../mocks/MockAdminAuthorizationService';
import { Group } from '../../models/group.model';
import { EmptyResponse } from '../../../../utils/empty-response.model';

describe('modules/admin/components/authorization-role/authorization-role.component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      declarations: [
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

  describe('delete authorization', () => {
    beforeEach(() => {
      spyOn(MockAdminAuthorizationService.prototype, 'deleteAuthorization').and.callFake((username: string, accessToken: string, group: Group) => {
        const httpResponse: HttpResponse<EmptyResponse> = new HttpResponse({
          status: 200
        });

        return Observable.create(observer => observer.next(httpResponse));
      });
    });

    it('should delete an authorization', () => {
      const fixture = TestBed.createComponent(AuthorizationRoleComponent);
      const authorizationComponent: AuthorizationRoleComponent = fixture.componentInstance;
      authorizationComponent.role = { name: 'ROLE_USER' };
      authorizationComponent.group = { name: 'ADMINS', roles: [{ name: 'ROLE_USER' }, { name: 'ROLE_ADMIN' }]};

      authorizationComponent.onDelete();

      expect(MockAdminAuthorizationService.prototype.deleteAuthorization).toHaveBeenCalledWith('john@doe.fr', 'bbb', { name: 'ADMINS', roles: [{ name: 'ROLE_USER' }]});
    });
  });
});
