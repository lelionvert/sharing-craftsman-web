import { Injectable } from '@angular/core';
import { HttpHeaders} from '@angular/common/http';

import { HEADERS } from '../../config/api.config';

@Injectable()
export class HeaderService {
  private headers: HttpHeaders;

  buildHeaders(): HeaderService {
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Content-Type', 'application/json')
    return this; 
  }

  withClientName(name): HeaderService {
    this.headers = this.headers.set(HEADERS.client, name);
    return this;
  }

  withClientSecret(secret): HeaderService {
    this.headers = this.headers.set(HEADERS.secret, secret);
    return this;
  }

  withUsername(username): HeaderService {
    this.headers = this.headers.set(HEADERS.username, username);
    return this;
  }

  withAccessToken(token): HeaderService {
    this.headers = this.headers.set(HEADERS.token, token);
    return this;
  }

  get(): HttpHeaders {
    return this.headers;
  }
}
