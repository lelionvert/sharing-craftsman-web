import { HeaderService } from './header.service';
import { HttpHeaders } from '@angular/common/http';

import { HEADERS } from '../../config/api.config';

describe('header service', () => {
  let headerService;

  beforeEach(() => {
    headerService = new HeaderService();
  });

  it('should build header with client name, secret, user username and token', () => {
    const headers: HttpHeaders = headerService.buildHeaders()
      .withClientName('client')
      .withClientSecret('secret')
      .withUsername('john@doe.fr')
      .withAccessToken('aaa')
      .get();

      expect(headers.get('client')).toBe('client');
      expect(headers.get('secret')).toBe('secret');
      expect(headers.get('username')).toBe('john@doe.fr');
      expect(headers.get('access-token')).toBe('aaa');
    });
});
