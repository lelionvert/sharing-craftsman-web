import { TestBed, async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { MockRouter } from '../../../../../mocks/MockRouter';
import { UserService } from '../../services/user.service';
import { MockUserService } from '../../../../../mocks/MockUserService';
import { Login } from '../../forms/login.form';
import { EmptyResponse } from '../../../../utils/empty-response.model';
import { ChangePasswordComponent } from './change-password.component';
import { ChangePassword } from '../../forms/change-password.form';
import { ChangePasswordToken } from '../../models/change-password-token.model';
import { MockCookieService } from '../../../../../mocks/MockCookieService';
import { COOKIES } from '../../../../config/keys.config';
import { CookieService } from '../../../../services/browser/cookie.service';

describe('modules/user/components/change-password/change-password.component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        ChangePasswordComponent
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
    it('should render change password component', () => {
      const fixture = TestBed.createComponent(ChangePasswordComponent);
      fixture.detectChanges();
      const loginComponent = fixture.nativeElement;
      expect(loginComponent.querySelector('h1').innerText).toBe('MODIFIE TON MOT DE PASSE');
      expect(loginComponent.querySelector('input[name="old-password"]').getAttribute('placeholder')).toBe('Passpass');
      expect(loginComponent.querySelector('input[name="new-password"]').getAttribute('placeholder')).toBe('Repass');
    });
  });

  describe('change password', () => {
    beforeEach(() => {
      spyOn(MockUserService.prototype, 'requestChangePasswordToken').and.callFake((username: string, accessToken: string) => {
        const httpResponse: HttpResponse<ChangePasswordToken> = new HttpResponse({
          body: {
            token: 'bbb'
          },
          status: 200
        });

        return Observable.create(observer => observer.next(httpResponse));
      });
      spyOn(MockUserService.prototype, 'changePassword').and.callFake((username: string, accessToken: string, changePasswordToken: string, oldPassword: string, newPassword: string) => {
        const httpResponse: HttpResponse<EmptyResponse> = new HttpResponse({
          status: 200
        });

        return Observable.create(observer => observer.next(httpResponse));
      });
      spyOn(MockCookieService.prototype, 'getCookie').and.callFake(name => {
        if (name === COOKIES.username)
          return 'john@doe.fr';
        else
          return 'aaa';
      });
      spyOn(MockCookieService.prototype, 'deleteCookie');
      spyOn(MockRouter.prototype, 'navigateByUrl');
    });

    it('should change password of user', () => {
      const fixture = TestBed.createComponent(ChangePasswordComponent);
      const changePasswordComponent: ChangePasswordComponent = fixture.componentInstance;
      changePasswordComponent.model = new ChangePassword('password', 'newpassword');
      changePasswordComponent.changePassword();

      expect(MockUserService.prototype.requestChangePasswordToken).toHaveBeenCalledWith('john@doe.fr', 'aaa');
      expect(MockUserService.prototype.changePassword).toHaveBeenCalledWith('john@doe.fr', 'aaa', 'bbb', 'password', 'newpassword');
      expect(MockCookieService.prototype.deleteCookie).toHaveBeenCalledWith(COOKIES.username);
      expect(MockCookieService.prototype.deleteCookie).toHaveBeenCalledWith(COOKIES.token);
      expect(MockCookieService.prototype.deleteCookie).toHaveBeenCalledWith(COOKIES.refreshToken);
      expect(MockRouter.prototype.navigateByUrl).toHaveBeenCalledWith('/login');
    });
  });
});
