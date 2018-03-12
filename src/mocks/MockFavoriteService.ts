import { Observable } from 'rxjs/Observable';
import { HttpResponse } from '@angular/common/http';
import { Favorite } from '../app/modules/library/models/favorite.model';

export class MockFavoriteService {
  getFavorites(username: string, accessToken: string): Observable<HttpResponse<Favorite[]>> {
    const httpResponse: HttpResponse<Favorite[]> = new HttpResponse({
      body: [
        {
          "id": "saa",
          "username": "john@doe.fr",
          "contentType": "KNOWLEDGE",
          "contentId": "kcc"
        },
        {
          "id": "sab",
          "username": "john@doe.fr",
          "contentType": "CATEGORY",
          "contentId": "aaa"
        }
      ],
      status: 200
    });

    return Observable.create(observer => observer.next(httpResponse));
  }

  addToMyFavorites(username: string, accessToken: string, contentType: string, contentId: string) { }

  deleteFavorite(username: string, accessToken: string, favoriteId: string) { }
}
