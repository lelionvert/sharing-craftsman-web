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
import { LostPasswordToken } from '../../models/lost-password-token.model';
import { Login } from '../../forms/login.form';
import { LostPassword } from '../../forms/lost-password.form';

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

  describe('request for lost password token', () => {
    beforeEach(() => {
      spyOn(MockUserService.prototype, 'requestLostPasswordToken').and.callFake((username: string) => {
        const httpResponse: HttpResponse<LostPasswordToken> = new HttpResponse({
          body: {
            changePasswordToken: {
              token: 'bbb'
            },
            email: {
              email: 'john@doe.fr'
            }
          },
          status: 200
        });

        return Observable.create(observer => observer.next(httpResponse));
      });
    });

    it('should request for a lost password token', () => {
      const fixture = TestBed.createComponent(LostPasswordComponent);
      const lostPasswordComponent: LostPasswordComponent = fixture.componentInstance;
      lostPasswordComponent.usernameModel = new Login('john@doe.fr');
      lostPasswordComponent.requestLostPasswordToken();

      expect(MockUserService.prototype.requestLostPasswordToken).toHaveBeenCalledWith('john@doe.fr');
    });
  });

  describe('request to change lost password', () => {
    beforeEach(() => {
      spyOn(MockUserService.prototype, 'changeLostPassword').and.callFake((username: string, changePasswordToken: string, newPassword: string) => {
        const httpResponse: HttpResponse<EmptyResponse> = new HttpResponse({
          status: 200
        });

        return Observable.create(observer => observer.next(httpResponse));
      });
      spyOn(MockRouter.prototype, 'navigateByUrl');
    });

    it('should request for a lost password token', () => {
      const fixture = TestBed.createComponent(LostPasswordComponent);
      const lostPasswordComponent: LostPasswordComponent = fixture.componentInstance;
      lostPasswordComponent.usernameModel = new Login('john@doe.fr');
      lostPasswordComponent.lostPasswordModel = new LostPassword('aaa', 'password', 'password');
      lostPasswordComponent.changePassword();

      expect(MockUserService.prototype.changeLostPassword).toHaveBeenCalledWith('john@doe.fr', 'aaa', 'password');
      expect(MockRouter.prototype.navigateByUrl).toHaveBeenCalledWith('/login');
    });
  });
});
