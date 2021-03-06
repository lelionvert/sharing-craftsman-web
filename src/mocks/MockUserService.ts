import { Observable } from 'rxjs/Observable';
import { HttpResponse } from '@angular/common/http';
import { AccessToken } from '../app/modules/user/models/access-token.model';
import { ChangePasswordToken } from '../app/modules/user/models/change-password-token.model';
import { LostPasswordToken } from '../app/modules/user/models/lost-password-token.model';

export class MockUserService {
  login(username: string, password: string, persistentLogging: boolean): Observable<HttpResponse<AccessToken>> {
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
  }

  register(username: string, password: string) { }

  requestChangePasswordToken(username: string, accessToken: string): Observable<HttpResponse<ChangePasswordToken>> {
    const httpResponse: HttpResponse<ChangePasswordToken> = new HttpResponse({
      body: {
        token: 'bbb'
      },
      status: 200
    });

    return Observable.create(observer => observer.next(httpResponse));
  }

  changePassword(username: string, accessToken: string, changePasswordToken: string, oldPassword: string, newPassword: string) { }

  requestLostPasswordToken(username: string): Observable<HttpResponse<LostPasswordToken>> {
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
  }

  changeLostPassword(username: string, changePasswordToken: string, newPassword: string) { }

  updateProfile(username: string, accessToken: string, profileInfo: any) { }

  refreshToken(username: string, refreshToken: string) { }
}
