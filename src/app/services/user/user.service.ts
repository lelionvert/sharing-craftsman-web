import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { HOST, HEADERS } from '../../config/api.config';
import { CLIENT_NAME, CLIENT_SECRET } from '../../config/keys.config';
import { Login } from '../../modules/user/models/login.model';
import { HeaderService } from '../browser/header.service';

@Injectable()
export class UserService {
  constructor(private http: HttpClient, private headerService: HeaderService) { }

  getLogins(username: string, password: string): Observable<HttpResponse<Login[]>> {
    const headers = this.headerService
      .buildHeaders()
      .withClientName(CLIENT_NAME)
      .withClientSecret(CLIENT_SECRET)
      .get();
    return this.http.get<Login[]>(`${HOST}/logins`, { observe: 'response', headers: headers });
  }

  private extractData(res: any) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      return { error: `An error occurred: ${error.error.message}` };
    } else {
      return { error: `Backend returned code ${error.status}, body was: ${error.error}` };
    }
  }
}
