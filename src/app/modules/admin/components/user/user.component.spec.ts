import { TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { FormsModule } from '@angular/forms';
import { MockCookieService } from '../../../../../mocks/MockCookieService';
import { COOKIES } from '../../../../config/keys.config';
import { CookieService } from '../../../../services/browser/cookie.service';
import { AdminUserComponent } from './user.component';
import { AdminUserService } from '../../services/admin.user.service';
import { MockAdminUserService } from '../../../../../mocks/MockAdminUserService';
import { EmptyResponse } from '../../../../utils/empty-response.model';
import { User } from '../../models/user.model';

describe('modules/admin/components/user/user.component', () => {
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
      ],
      declarations: [
        AdminUserComponent
      ],
      providers: [
        { provide: CookieService, useClass: MockCookieService },
        { provide: AdminUserService, useClass: MockAdminUserService }
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

  describe('delete user', () => {
    beforeEach(() => {
      spyOn(MockAdminUserService.prototype, 'deleteUser').and.callFake((username: string, accessToken: string, usernameToDelete: string) => {
        const httpResponse: HttpResponse<EmptyResponse> = new HttpResponse({
          status: 200
        });

        return Observable.create(observer => observer.next(httpResponse));
      });
    });

    it('should delete user', () => {
      const fixture = TestBed.createComponent(AdminUserComponent);
      const component: AdminUserComponent = fixture.componentInstance;
      component.user = user;

      component.onClickDelete();

      expect(MockAdminUserService.prototype.deleteUser).toHaveBeenCalledWith('john@doe.fr', 'bbb', 'john@doe.fr');
    });
  });
});
