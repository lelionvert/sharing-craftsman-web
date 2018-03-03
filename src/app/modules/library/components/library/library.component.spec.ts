import { TestBed, async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { MockRouter } from '../../../../../mocks/MockRouter';
import { EmptyResponse } from '../../../../utils/empty-response.model';
import { MockCookieService } from '../../../../../mocks/MockCookieService';
import { COOKIES } from '../../../../config/keys.config';
import { CookieService } from '../../../../services/browser/cookie.service';
import { LibraryComponent } from './library.component';

describe('modules/library/components/library/library.component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        LibraryComponent
      ],
      providers: [
        
      ]
    });
    TestBed.compileComponents();
  }));

  describe('rendering', () => {
    it('should render library component', () => {
      const fixture = TestBed.createComponent(LibraryComponent);
      fixture.detectChanges();
      const loginComponent = fixture.nativeElement;
      expect(loginComponent.querySelector('h1').innerText).toBe('MODIFIE TON MOT DE PASSE');
      expect(loginComponent.querySelector('h2').innerText).toBe('Passpass');
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
