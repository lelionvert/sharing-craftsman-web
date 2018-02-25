import { TestBed, async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { LoginComponent } from './login.component';
import { MockRouter } from '../../../../../mocks/MockRouter';
import { CookieService } from '../../../../services/browser/cookie.service';
import { MockCookieService } from '../../../../../mocks/MockCookieService';
import { UserService } from '../../services/user.service';
import { MockUserService } from '../../../../../mocks/MockUserService';
import { Login } from '../../forms/login.form';
import { COOKIES } from '../../../../config/keys.config';
import { AccessToken } from '../../models/access-token.model';

describe('modules/user/components/login/login.component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        LoginComponent
      ],
      providers: [
        { provide: Router, useClass: MockRouter },
        { provide: CookieService, useClass: MockCookieService },
        { provide: UserService, useClass: MockUserService }
      ]
    });
    TestBed.compileComponents();
  }));

  describe('rendering', () => {
    it('should render login component', () => {
      const fixture = TestBed.createComponent(LoginComponent);
      fixture.detectChanges();
      const loginComponent = fixture.nativeElement;
      expect(loginComponent.querySelector('h1').innerText).toBe('LOG IN');
      expect(loginComponent.querySelector('input[name="username"]').getAttribute('placeholder')).toBe('John');
      expect(loginComponent.querySelector('input[name="password"]').getAttribute('placeholder')).toBe('Doe');
    });
  });

  describe('login', () => {
    beforeEach(() => {
      spyOn(MockUserService.prototype, 'login').and.callFake(() => {
        const httpResponse: HttpResponse<AccessToken> = new HttpResponse({
          body: {
            username: 'john@doe.fr',
            accessToken: 'aaa',
            refreshToken: 'bbb',
            expirationDate: 1514631600000
          },
          status: 200
        });
    
        return Observable.create(observer => observer.next(httpResponse));
      });
      spyOn(MockCookieService.prototype, 'setCookie');
    });

    it('should log in user', () => {
      const fixture = TestBed.createComponent(LoginComponent);
      const loginComponent: LoginComponent = fixture.componentInstance;
      loginComponent.model = new Login('john@doe.fr', 'password', false);
      loginComponent.login();
      expect(MockUserService.prototype.login).toHaveBeenCalledWith('john@doe.fr', '5f4dcc3b5aa765d61d8327deb882cf99', false);
      expect(MockCookieService.prototype.setCookie).toHaveBeenCalledWith(COOKIES.username, 'john@doe.fr', '2017-12-30T11:00:00.000Z');
      expect(MockCookieService.prototype.setCookie).toHaveBeenCalledWith(COOKIES.token, 'aaa', '2017-12-30T11:00:00.000Z');
      expect(MockCookieService.prototype.setCookie).toHaveBeenCalledWith(COOKIES.refreshToken, 'bbb', '2019-12-30T11:00:00.000Z');
    });
  });
});
