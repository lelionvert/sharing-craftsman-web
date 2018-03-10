import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { HeaderService } from '../../../services/browser/header.service';
import { CLIENT_NAME, CLIENT_SECRET } from '../../../config/keys.config';
import { HOST, BACK_END_ROUTES } from '../../../config/api.config';
import { Score } from '../models/score.model';

@Injectable()
export class ScoreService {
  constructor(private http: HttpClient, private headerService: HeaderService) { }

  getScoresByContentId(username: string, accessToken: string, contentId: string): Observable<HttpResponse<Score[]>> {
    return this.http.get<Score[]>(
      `${HOST}/${BACK_END_ROUTES.library.getScoresByContentId}/${contentId}`,
      { observe: 'response', headers: this.getUserHeaders(username, accessToken) }
    );
  }

  getScoresByMark(username: string, accessToken: string, mark: number): Observable<HttpResponse<Score[]>> {
    return this.http.get<Score[]>(
      `${HOST}/${BACK_END_ROUTES.library.getScoresByMark}/${mark}`,
      { observe: 'response', headers: this.getUserHeaders(username, accessToken) }
    );
  }

  addScore(username: string, accessToken: string, contentType: string, contentId: string, mark: number) {
    return this.http.post(
      `${HOST}/${BACK_END_ROUTES.library.scores}`,
      {
        giver: username,
        contentType: contentType,
        contentId: contentId,
        mark: mark
      },
      { observe: 'response', headers: this.getUserHeaders(username, accessToken) }
    );
  }

  updateScore(username: string, accessToken: string, scoreId: string, contentType: string, contentId: string, mark: number) {
    return this.http.put(
      `${HOST}/${BACK_END_ROUTES.library.scores}`,
      {
        id: scoreId,
        giver: username,
        contentType: contentType,
        contentId: contentId,
        mark: mark
      },
      { observe: 'response', headers: this.getUserHeaders(username, accessToken) }
    );
  }

  deleteScore(username: string, accessToken: string, scoreId: string) {
    return this.http.post(
      `${HOST}/${BACK_END_ROUTES.library.deleteScore}`,
      {
        id: scoreId,
        giver: username,
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