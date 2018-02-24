import { Observable } from 'rxjs/Observable';
import { HttpResponse } from '@angular/common/http';
import { AccessToken } from '../app/modules/user/models/access-token.model';

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
}
