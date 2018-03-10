import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { HeaderService } from '../../../services/browser/header.service';
import { CLIENT_NAME, CLIENT_SECRET } from '../../../config/keys.config';
import { HOST, BACK_END_ROUTES } from '../../../config/api.config';

@Injectable()
export class KnowledgeService {
  constructor(private http: HttpClient, private headerService: HeaderService) { }

  addKnowledgeToCategory(username: String, accessToken: String, categoryId: String, knowledgeTitle: String, knowledgeContent: String) {
    return this.http.post(
      `${HOST}/${BACK_END_ROUTES.library.knowledges}`,
      {
        categoryId: categoryId,
        creator: username,
        title: knowledgeTitle,
        content: knowledgeContent
      },
      { observe: 'response', headers: this.getUserHeaders(username, accessToken) }
    );
  }

  updateKnowledge(username: String, accessToken: String, categoryId: String, knowledgeId: String, knowledgeTitle: String, knowledgeContent: String) {
    return this.http.put(
      `${HOST}/${BACK_END_ROUTES.library.knowledges}`,
      {
        id: knowledgeId,
        categoryId: categoryId,
        creator: username,
        title: knowledgeTitle,
        content: knowledgeContent
      },
      { observe: 'response', headers: this.getUserHeaders(username, accessToken) }
    );
  }

  deleteKnowledge(username: String, accessToken: String, categoryId: String, knowledgeId: String) {
    return this.http.post(
      `${HOST}/${BACK_END_ROUTES.library.deleteKnowledge}`,
      {
        id: knowledgeId,
        categoryId: categoryId
      },
      { observe: 'response', headers: this.getUserHeaders(username, accessToken) }
    );
  }

  private getUserHeaders(username: String, token: String) {
    return this.headerService
      .buildHeaders()
      .withClientName(CLIENT_NAME)
      .withClientSecret(CLIENT_SECRET)
      .withUsername(username)
      .withAccessToken(token)
      .get();
  }
}