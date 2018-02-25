import { TestBed, async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { MockRouter } from '../../../../../mocks/MockRouter';
import { UserService } from '../../services/user.service';
import { MockUserService } from '../../../../../mocks/MockUserService';
import { EmptyResponse } from '../../../../utils/empty-response.model';
import { LostPasswordComponent } from './lost-password.component';

describe('modules/user/components/lost-password/lost-password.component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        LostPasswordComponent
      ],
      providers: [
        { provide: Router, useClass: MockRouter },
        { provide: UserService, useClass: MockUserService }
      ]
    });
    TestBed.compileComponents();
  }));

  describe('rendering', () => {
    it('should render lost password component', () => {
      const fixture = TestBed.createComponent(LostPasswordComponent);
      fixture.detectChanges();
      const loginComponent = fixture.nativeElement;
      expect(loginComponent.querySelector('h1').innerText).toBe('MOT DE PASSE PERDU');
      expect(loginComponent.querySelector('input[name="username"]').getAttribute('placeholder')).toBe('Username');
      expect(loginComponent.querySelector('input[name="token"]').getAttribute('placeholder')).toBe('Clé');
    });
  });

  // describe('change password', () => {
  //   beforeEach(() => {
  //     spyOn(MockUserService.prototype, 'requestChangePasswordToken').and.callFake((username: string, accessToken: string) => {
  //       const httpResponse: HttpResponse<ChangePasswordToken> = new HttpResponse({
  //         body: {
  //           token: 'bbb'
  //         },
  //         status: 200
  //       });

  //       return Observable.create(observer => observer.next(httpResponse));
  //     });
  //     spyOn(MockUserService.prototype, 'changePassword').and.callFake((username: string, accessToken: string, changePasswordToken: string, oldPassword: string, newPassword: string) => {
  //       const httpResponse: HttpResponse<EmptyResponse> = new HttpResponse({
  //         status: 200
  //       });

  //       return Observable.create(observer => observer.next(httpResponse));
  //     });
  //     spyOn(MockCookieService.prototype, 'getCookie').and.callFake(name => {
  //       if (name === COOKIES.username)
  //         return 'john@doe.fr';
  //       else
  //         return 'aaa';
  //     });
  //     spyOn(MockCookieService.prototype, 'deleteCookie');
  //     spyOn(MockRouter.prototype, 'navigateByUrl');
  //   });

  //   it('should change password of user', () => {
  //     const fixture = TestBed.createComponent(ChangePasswordComponent);
  //     const changePasswordComponent: ChangePasswordComponent = fixture.componentInstance;
  //     changePasswordComponent.model = new ChangePassword('password', 'newpassword');
  //     changePasswordComponent.changePassword();

  //     expect(MockUserService.prototype.requestChangePasswordToken).toHaveBeenCalledWith('john@doe.fr', 'aaa');
  //     expect(MockUserService.prototype.changePassword).toHaveBeenCalledWith('john@doe.fr', 'aaa', 'bbb', 'password', 'newpassword');
  //     expect(MockCookieService.prototype.deleteCookie).toHaveBeenCalledWith(COOKIES.username);
  //     expect(MockCookieService.prototype.deleteCookie).toHaveBeenCalledWith(COOKIES.token);
  //     expect(MockCookieService.prototype.deleteCookie).toHaveBeenCalledWith(COOKIES.refreshToken);
  //     expect(MockRouter.prototype.navigateByUrl).toHaveBeenCalledWith('/login');
  //   });
  // });
});
