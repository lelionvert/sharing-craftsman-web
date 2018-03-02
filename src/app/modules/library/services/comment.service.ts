import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { HeaderService } from '../../../services/browser/header.service';
import { CLIENT_NAME, CLIENT_SECRET } from '../../../config/keys.config';
import { HOST, BACK_END_ROUTES } from '../../../config/api.config';
import { Comment } from '../models/comment.model';

@Injectable()
export class CommentService {
  constructor(private http: HttpClient, private headerService: HeaderService) { }

  getCommentsByContentId(username: string, accessToken: string, contentId: string): Observable<HttpResponse<Comment[]>> {
    return this.http.get<Comment[]>(
      `${HOST}/${BACK_END_ROUTES.library.getCommentByContentId}/${contentId}`,
      { observe: 'response', headers: this.getUserHeaders(username, accessToken) }
    );
  }

  getCommentsById(username: string, accessToken: string, commentId: string): Observable<HttpResponse<Comment>> { 
    return this.http.get<Comment>(
      `${HOST}/${BACK_END_ROUTES.library.comments}/${commentId}`,
      { observe: 'response', headers: this.getUserHeaders(username, accessToken) }
    );
  }

  addComment(username: string, accessToken: string, contentType: string, contentId: string, comment: string) {
    return this.http.post(
      `${HOST}/${BACK_END_ROUTES.library.comments}`,
      {
        commenter: username,
        contentType: contentType,
        contentId: contentId,
        content: comment
      },
      { observe: 'response', headers: this.getUserHeaders(username, accessToken) }
    );
  }

  updateComment(username: string, accessToken: string, commentId: string, contentType: string, contentId: string, comment: string) {
    return this.http.put(
      `${HOST}/${BACK_END_ROUTES.library.comments}`,
      {
        id: commentId,
        commenter: username,
        contentType: contentType,
        contentId: contentId,
        content: comment
      },
      { observe: 'response', headers: this.getUserHeaders(username, accessToken) }
    );
  }

  deleteComment(username: string, accessToken: string, commentId: string) {
    return this.http.put(
      `${HOST}/${BACK_END_ROUTES.library.deleteComment}`,
      {
        id: commentId,
        commenter: username,
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