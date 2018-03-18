import { Observable } from 'rxjs/Observable';
import { HttpResponse } from '@angular/common/http';
import { EmptyResponse } from '../app/utils/empty-response.model';
import { User } from '../app/modules/admin/models/user.model';
import { UserAuthorization } from '../app/modules/admin/models/user.authorization.model';

export class MockAdminUserService {

  getUsers(username: string, accessToken: string): Observable<HttpResponse<User[]>> {
    const httpResponse = new HttpResponse<User[]>({
      body: [
        {
          "username": "john@doe.fr",
          "password": "password",
          "firstname": "John",
          "lastname": "Doe",
          "email": "john@doe.fr",
          "website": "www.johndoe.fr",
          "github": "github.com/johndoe",
          "linkedin": "linkedin.com/johndoe",
          "authorizations": {
            "groups": [
              {
                "roles": [
                  {
                    "name": "ROLE_USER"
                  }
                ],
                "name": "USERS"
              }
            ]
          },
          "creationDate": 1514631600000,
          "lastUpdateDate": 1514631600000,
          "picture": "picture.jpg",
          "active": true
        },
        {
          "username": "admin@toto.fr",
          "password": "password",
          "firstname": "Admin",
          "lastname": "Toto",
          "email": "admin@toto.fr",
          "website": "www.admintoto.fr",
          "github": "github.com/admintoto",
          "linkedin": "linkedin.com/admintoto",
          "authorizations": {
            "groups": [
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
          "creationDate": 1514631600000,
          "lastUpdateDate": 1514631600000,
          "picture": "picture.jpg",
          "active": true
        }
      ],
      status: 200
    });

    return Observable.create(observer => observer.next(httpResponse));
  }

  createUser(username: string, accessToken: string, user: User) { }

  updateUser(username: string, accessToken: string, user: User) { }

  deleteUser(username: string, accessToken: string, usernameToDelete: string) { }

  addGroupToUser(username: string, accessToken: string, userAuthorization: UserAuthorization) { }

  removeGroupFromUser(username: string, accessToken: string, userAuthorization: UserAuthorization) { }
}
