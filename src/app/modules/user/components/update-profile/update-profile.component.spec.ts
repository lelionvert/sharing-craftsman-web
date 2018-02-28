import { TestBed, async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { UserService } from '../../services/user.service';
import { MockUserService } from '../../../../../mocks/MockUserService';
import { EmptyResponse } from '../../../../utils/empty-response.model';
import { UpdateProfileComponent } from './update-profile.component';
import { CookieService } from '../../../../services/browser/cookie.service';
import { MockCookieService } from '../../../../../mocks/MockCookieService';
import { COOKIES } from '../../../../config/keys.config';
import { Profile } from '../../forms/profile.form';

describe('modules/user/components/registration/registration.component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        UpdateProfileComponent
      ],
      providers: [
        { provide: UserService, useClass: MockUserService },
        { provide: CookieService, useClass: MockCookieService }
      ]
    });
    TestBed.compileComponents();
  }));

  describe('rendering', () => {
    it('should render login component', () => {
      const fixture = TestBed.createComponent(UpdateProfileComponent);
      fixture.detectChanges();
      const loginComponent = fixture.nativeElement;
      expect(loginComponent.querySelector('h1').innerText).toBe('MODIFIE LES INFORMATIONS DE TON COMPTE');
      expect(loginComponent.querySelector('input[name="firstname"]').getAttribute('placeholder')).toBe('John');
      expect(loginComponent.querySelector('input[name="lastname"]').getAttribute('placeholder')).toBe('Doe');
    });
  });

  describe('register', () => {
    beforeEach(() => {
      // updateProfile(username: string, accessToken: string, profileInfo: any)
      spyOn(MockUserService.prototype, 'updateProfile').and.callFake((username: string, accessToken: string, profileInfo: any) => {
        const httpResponse: HttpResponse<EmptyResponse> = new HttpResponse({
          status: 200
        });

        return Observable.create(observer => observer.next(httpResponse));
      });
      spyOn(MockCookieService.prototype, 'getCookie').and.callFake((name: string) => {
        if (name === COOKIES.username)
          return 'john@doe.fr';
        else
          return 'aaa';
      });
    });

    it('should update user profile', () => {
      const fixture = TestBed.createComponent(UpdateProfileComponent);
      const updateProfileComponent: UpdateProfileComponent = fixture.componentInstance;
      const profile = new Profile(
        'John',
        'Doe',
        'john@doe.fr',
        'www.johndoe.fr',
        'github.com/johndoe',
        'linkedin.com/johndoe',
        'profile.jpg'
      );
      updateProfileComponent.model = profile;
      updateProfileComponent.updateProfile();
      expect(MockUserService.prototype.updateProfile).toHaveBeenCalledWith('john@doe.fr', 'aaa', profile.toJSON());
    });
  });
});
