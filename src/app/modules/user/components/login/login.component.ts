import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';

import { Login } from '../../models/login.model';

@Component({
  selector: 'sc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public model: Login;
  public submitted: boolean;
  public errorMessage: string;

  constructor(
    private router: Router
  ) {
    this.submitted = false;
  }

  ngOnInit() {
    // if (this.cookieService.getCookie('portfolio_remember') === 'true') {
    //   this.httpService.getAllResources(
    //     OAUTH2_CHECK_ACCESS_TOKEN,
    //     [AUTHENTICATION_SCHEMAS_TOKEN, AUTHENTICATION_SCHEMAS_BASIC_CLIENT],
    //     {
    //       username: CLIENT_CREDENTIALS.username,
    //       password: CLIENT_CREDENTIALS.password,
    //       token: HEADER_ACCESS_TOKEN
    //     }
    //   )
    //   .subscribe(
    //     result => this.redirectIfAuthenticated(result),
    //     error => this.errorMessage = <any>error
    //   );
    // }
  }

  onSubmit() { this.submitted = true; }

  login() {
    // this.httpService.postResource(
    //   OAUTH2_GET_AUTHORIZATION_CODE,
    //   {
    //     username: this.model.username,
    //     clientId: CLIENT_CREDENTIALS.username,
    //     clientPass: CLIENT_CREDENTIALS.password
    //   },
    //   [AUTHENTICATION_SCHEMAS_BASIC_USER],
    //   {
    //     username: this.model.username,
    //     password: Md5.hashStr(this.model.password)
    //   }
    // ).subscribe(
    //   code => this.getToken(code),
    //   error => this.errorMessage = <any>error
    // );
  }

  // getToken(code: string) {
  //   this.httpService.postResource(
  //     OAUTH2_GET_ACCESS_TOKEN,
  //     {
  //       code: code,
  //       grant_type: AUTHENTICATION_GRANT_TYPE,
  //       redirect_uri: HOST
  //     },
  //     [AUTHENTICATION_SCHEMAS_BASIC_CLIENT],
  //     {
  //       username: CLIENT_CREDENTIALS.username,
  //       password: CLIENT_CREDENTIALS.password
  //     }
  //   ).subscribe(
  //     token => this.setToken(token),
  //     error => this.errorMessage = <any>error
  //   );
  // }

  // redirectIfAuthenticated(result: any) {
  //   if (result.result) {
  //     this.router.navigateByUrl('/');
  //   } else {
  //     this.renewAccessToken();
  //   }
  // }

  // renewAccessToken() {
  //   this.httpService.getAllResources(
  //     OAUTH2_RENEW_ACCESS_TOKEN,
  //     [AUTHENTICATION_SCHEMAS_TOKEN, AUTHENTICATION_SCHEMAS_BASIC_USER],
  //     {
  //       username: CLIENT_CREDENTIALS.username,
  //       password: CLIENT_CREDENTIALS.password,
  //       token: HEADER_REFRESH_TOKEN
  //     }
  //   ).subscribe(
  //     token => this.setToken({access_token: token}),
  //     error => this.errorMessage = <any>error
  //   );
  // }

  // setToken(token: any) {
  //   if (token.access_token) {
  //     if (this.model.rememberMe) {
  //       this.cookieService.setCookie('portfolio_remember', 'true', token.access_token.expirationDate);
  //       this.cookieService.setCookie('portfolio_accesstoken', token.access_token.value, token.access_token.expirationDate);
  //     } else {
  //       // if not remember me, set access token expiration date to current + 8h
  //       let currentDate = new Instant();
  //       currentDate.addHours(8);
  //       this.cookieService.setCookie('portfolio_accesstoken', token.access_token.value, currentDate.toISOString());
  //     }

  //     this.cookieService.setCookie('portfolio_refreshtoken', token.access_token.refreshToken, 'Mon, 1 Jan 2050 12:00:00 UTC');
  //     this.router.navigateByUrl('/');
  //   }
  // }
}
