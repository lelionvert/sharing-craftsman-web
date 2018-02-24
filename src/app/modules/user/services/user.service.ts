import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Login } from '../models/login.model';
import { HOST, HEADERS } from '../../../config/api.config';
import { CLIENT_NAME, CLIENT_SECRET } from '../../../config/keys.config';
import { HeaderService } from '../../../services/browser/header.service';

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
}
