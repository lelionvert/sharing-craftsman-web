import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { HeaderService } from '../../../services/browser/header.service';
import { CLIENT_NAME, CLIENT_SECRET } from '../../../config/keys.config';
import { HOST, BACK_END_ROUTES } from '../../../config/api.config';
import { Favorite } from '../models/favorite.model';

@Injectable()
export class FavoriteService {
  constructor(private http: HttpClient, private headerService: HeaderService) { }

  getFavorites(username: string, accessToken: string): Observable<HttpResponse<Favorite[]>> {
    return this.http.post<Favorite[]>(
      `${HOST}/${BACK_END_ROUTES.library.getFavorites}`,
      {
        username: username
      },
      { observe: 'response', headers: this.getUserHeaders(username, accessToken) }
    );
  }

  addToMyFavorites(username: string, accessToken: string, contentType: string, contentId: string) {
    return this.http.post(
      `${HOST}/${BACK_END_ROUTES.library.favorites}`,
      {
        username: username,
        contentType: contentType,
        contentId: contentId
      },
      { observe: 'response', headers: this.getUserHeaders(username, accessToken) }
    );
  }

  deleteFavorite(username: string, accessToken: string, favoriteId: string) {
    return this.http.post(
      `${HOST}/${BACK_END_ROUTES.library.deleteFavorite}`,
      {
        id: favoriteId,
        username: username
      },
      { observe: 'response', headers: this.getUserHeaders(username, accessToken) }
    );
  }

  private getUserHeaders(username: string, token: string) {
    return this.headerService
      .buildHeaders()
      .withClientName(CLIENT_NAME)
      .withClientSecret(CLIENT_SECRET)
      .withUsername(username)
      .withAccessToken(token)
      .get();
  }
}