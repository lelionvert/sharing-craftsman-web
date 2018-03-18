import { TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { FormsModule } from '@angular/forms';
import { MockCookieService } from '../../../../../mocks/MockCookieService';
import { COOKIES } from '../../../../config/keys.config';
import { CookieService } from '../../../../services/browser/cookie.service';
import { AdminUsersComponent } from './users.component';
import { AdminUserService } from '../../services/admin.user.service';
import { MockAdminUserService } from '../../../../../mocks/MockAdminUserService';
import { AdminUserComponent } from '../user/user.component';
import { User } from '../../models/user.model';
import { UserForm } from '../../forms/user.form';
import { EmptyResponse } from '../../../../utils/empty-response.model';

describe('modules/admin/components/users/users.component', () => {
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
        AdminUsersComponent,
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

  describe('rendering', () => {
    it('should render users admin page', () => {
      const fixture = TestBed.createComponent(AdminUsersComponent);
      fixture.detectChanges();
      const component = fixture.nativeElement;
      expect(component.querySelector('h1').innerText).toBe('GESTION DES UTILISATEURS');
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
      const fixture = TestBed.createComponent(AdminUsersComponent);
      const component: AdminUsersComponent = fixture.componentInstance;

      component.ngOnInit();

      expect(component.users).toEqual(users);
      expect(MockAdminUserService.prototype.getUsers).toHaveBeenCalledWith('john@doe.fr', 'bbb');
    });
  });

  describe('user management', () => {
    beforeEach(() => {
      spyOn(MockAdminUserService.prototype, 'createUser').and.callFake((username: string, accessToken: string, user: User) => {
        const httpResponse: HttpResponse<EmptyResponse[]> = new HttpResponse({
          status: 200
        });

        return Observable.create(observer => observer.next(httpResponse));
      });

      spyOn(MockAdminUserService.prototype, 'updateUser').and.callFake((username: string, accessToken: string, user: User) => {
        const httpResponse: HttpResponse<EmptyResponse[]> = new HttpResponse({
          status: 200
        });

        return Observable.create(observer => observer.next(httpResponse));
      });
    });

    it('should create a new user', () => {
      const fixture = TestBed.createComponent(AdminUsersComponent);
      const component: AdminUsersComponent = fixture.componentInstance;
      component.model = new UserForm('john@doe.fr', 'password', 'John', 'Doe', 'john@doe.fr', 'johndoe.fr', 'github.com/johndoe', 'linkedin.com/johndoe', true, true);

      component.createUser();

      expect(MockAdminUserService.prototype.createUser).toHaveBeenCalledWith(
        'john@doe.fr',
        'bbb',
        {
          username: 'john@doe.fr',
          password: '5f4dcc3b5aa765d61d8327deb882cf99',
          firstname: 'John',
          lastname: 'Doe',
          email: 'john@doe.fr',
          website: 'johndoe.fr',
          github: 'github.com/johndoe',
          linkedin: 'linkedin.com/johndoe',
          authorizations: {
            groups: [
              {
                name: 'USERS',
                roles: [{ name: 'ROLE_USER'}]
              }
            ]
          },
          picture: '',
          creationDate: 0, 
          lastUpdateDate: 0,
          active: true
        }
      );
    });

    it('should update a user', () => {
      const fixture = TestBed.createComponent(AdminUsersComponent);
      const component: AdminUsersComponent = fixture.componentInstance;
      component.model = new UserForm('john@doe.fr', null, 'John', 'Doe', 'john@doe.fr', 'johndoe.fr', 'github.com/johndoe', 'linkedin.com/johndoe', true, false);

      component.updateUser();

      expect(MockAdminUserService.prototype.updateUser).toHaveBeenCalledWith(
        'john@doe.fr',
        'bbb',
        {
          username: 'john@doe.fr',
          password: null,
          firstname: 'John',
          lastname: 'Doe',
          email: 'john@doe.fr',
          website: 'johndoe.fr',
          github: 'github.com/johndoe',
          linkedin: 'linkedin.com/johndoe',
          authorizations: {
            groups: [
              {
                name: 'USERS',
                roles: [{ name: 'ROLE_USER'}]
              }
            ]
          },
          picture: '',
          creationDate: 0, 
          lastUpdateDate: 0,
          active: true
        }
      );
    });
  });
});
