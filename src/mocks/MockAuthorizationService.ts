import { Observable } from 'rxjs/Observable';
import { HttpResponse } from '@angular/common/http';
import { EmptyResponse } from '../app/utils/empty-response.model';

export class MockAuthorizationService {
  getRoles() {
    const httpResponse = new HttpResponse({
      body: {
        "groups": [
          {
            "roles": [
              {
                "name": "ROLE_USER"
              }
            ],
            "name": "USERS"
          },
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
      status: 200
    });

    return Observable.create(observer => observer.next(httpResponse));
  }

  isAuthenticated() {
    const httpResponse = new HttpResponse({
      status: 200
    });

    return Observable.create(observer => observer.next(httpResponse));
  }
}
