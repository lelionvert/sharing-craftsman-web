import { Injectable } from '@angular/core';

@Injectable()
export class CookieService {
  setCookie(name: string, value: string, expirationDate: string) {
    let d = new Date(expirationDate);
    let expires = 'expires=' + d.toUTCString();
    document.cookie = name + '=' + value + ';' + expires;
  }

  getCookie(cname: string) {
    let name = cname + '=';
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
  }

  deleteCookie(cname: string) {
    document.cookie = cname + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
}
