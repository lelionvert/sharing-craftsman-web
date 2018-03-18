import { Observable } from 'rxjs/Observable';
import { HttpResponse } from '@angular/common/http';
import { EmptyResponse } from '../app/utils/empty-response.model';
import { Group } from '../app/modules/admin/models/group.model';

export class MockAdminAuthorizationService {
  getAuthorizations(username: string, accessToken: string): Observable<HttpResponse<Group[]>> {
    const httpResponse = new HttpResponse<Group[]>({
      body: [
        {
          name: "USERS",
          roles: [
            {
              name: "ROLE_USER"
            }
          ]
        },
        {
          name: "ADMINS",
          roles: [
            {
              name: "ROLE_USER"
            },
            {
              name: "ROLE_ADMIN"
            }
          ]
        }
      ],
      status: 200
    });

    return Observable.create(observer => observer.next(httpResponse));
  }

  createAuthorization(username: string, accessToken: string, group: Group) { }

  deleteAuthorization(username: string, accessToken: string, group: Group) { }
}
