import { TestBed, async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { MockRouter } from '../../../../../mocks/MockRouter';
import { UserService } from '../../services/user.service';
import { MockUserService } from '../../../../../mocks/MockUserService';
import { Login } from '../../forms/login.form';
import { RegistrationComponent } from './registration.component';
import { EmptyResponse } from '../../../../utils/empty-response.model';

describe('modules/user/components/registration/registration.component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        RegistrationComponent
      ],
      providers: [
        { provide: Router, useClass: MockRouter },
        { provide: UserService, useClass: MockUserService }
      ]
    });
    TestBed.compileComponents();
  }));

  describe('rendering', () => {
    it('should render login component', () => {
      const fixture = TestBed.createComponent(RegistrationComponent);
      fixture.detectChanges();
      const loginComponent = fixture.nativeElement;
      expect(loginComponent.querySelector('h1').innerText).toBe('CRÉE TON COMPTE');
      expect(loginComponent.querySelector('input[name="username"]').getAttribute('placeholder')).toBe('John');
      expect(loginComponent.querySelector('input[name="password"]').getAttribute('placeholder')).toBe('Doe');
    });
  });

  describe('register', () => {
    beforeEach(() => {
      spyOn(MockUserService.prototype, 'register').and.callFake(() => {
        const httpResponse: HttpResponse<EmptyResponse> = new HttpResponse({
          status: 200
        });
    
        return Observable.create(observer => observer.next(httpResponse));
      });
      spyOn(MockRouter.prototype, 'navigateByUrl');
    });

    it('should register user', () => {
      const fixture = TestBed.createComponent(RegistrationComponent);
      const registrationComponent: RegistrationComponent = fixture.componentInstance;
      registrationComponent.model = new Login('john@doe.fr', 'password', 'password');
      registrationComponent.register();
      expect(MockUserService.prototype.register).toHaveBeenCalledWith('john@doe.fr', '5f4dcc3b5aa765d61d8327deb882cf99');
      expect(MockRouter.prototype.navigateByUrl).toHaveBeenCalledWith('/login');
    });

    it('should not register user if password and repeat password are not the same', () => {
      const fixture = TestBed.createComponent(RegistrationComponent);
      const registrationComponent: RegistrationComponent = fixture.componentInstance;
      registrationComponent.model = new Login('john@doe.fr', 'password', 'differentpassword');
      registrationComponent.register();
      expect(registrationComponent.errorMessage).toEqual('Les mots de passe ne sont pas identiques.');
    });
  });
});
