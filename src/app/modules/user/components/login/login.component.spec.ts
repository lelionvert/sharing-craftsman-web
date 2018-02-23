// import { TestBed, async } from '@angular/core/testing';
// import { Router } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { Observable } from 'rxjs/Rx';
// import { LoginComponent } from './login.component';
// import { HTTPService } from '../../../../services/http.service';
// import { CookieService } from '../../../../services/cookie.service';
// import { UserService } from '../../../../services/user.service';
// import { Login } from '../../models/login.model';
// import {
//   OAUTH2_CHECK_ACCESS_TOKEN,
//   OAUTH2_RENEW_ACCESS_TOKEN
// } from '../../../../config/api.config';

// class MockCookieService {
//   getCookie(cookieName: string) {
//     return 'true';
//   }
// }

// class MockHTTPService {
//   getAllResources(path: string, authenticationSchemas: string[], options?: any) {
//     if (path === OAUTH2_CHECK_ACCESS_TOKEN) {
//       return Observable.of(false);
//     } else if (path === OAUTH2_RENEW_ACCESS_TOKEN) {
//       return Observable.of({
//         access_token: {
//           value: 'abcd',
//           refreshToken: 'efgh',
//           expirationDate: new Date()
//         }
//       });
//     }
//   }

//   postResource() {
//     return Observable.of('abcd');
//   }
// }

// class MockUserService {

// }

// class MockRouter {
//   navigateByUrl(path: string) {
//     return path;
//   }
// }

// describe('login component', () => {
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         FormsModule
//       ],
//       declarations: [
//         LoginComponent
//       ],
//       providers: [
//         { provide: Router, useClass: MockRouter },
//         { provide: HTTPService, useClass: MockHTTPService },
//         { provide: CookieService, useClass: MockCookieService },
//         { provide: UserService, useClass: MockUserService }
//       ]
//     });
//     TestBed.compileComponents();
//   }));

//   describe('rendering', () => {
//     beforeEach(() => {
//       spyOn(MockCookieService.prototype, 'getCookie').and.callFake(() => {
//         return 'false';
//       });
//     });

//     it('should render login component', () => {
//       const fixture = TestBed.createComponent(LoginComponent);
//       fixture.detectChanges();
//       const loginComponent = fixture.nativeElement;
//       expect(loginComponent.querySelector('h1').innerText).toBe('Identification');
//       expect(loginComponent.querySelector('input[name="username"]').getAttribute('placeholder')).toBe('John');
//       expect(loginComponent.querySelector('input[name="password"]').getAttribute('placeholder')).toBe('Doe');
//     });
//   });

//   describe('init when remember me', () => {
//     beforeEach(() => {
//       spyOn(LoginComponent.prototype, 'redirectIfAuthenticated');
//     });

//     it('should call redirectIfAuthenticated if cookie remember me is true', () => {
//       const fixture = TestBed.createComponent(LoginComponent);
//       fixture.detectChanges();
//       expect(LoginComponent.prototype.redirectIfAuthenticated).toHaveBeenCalled();
//     });
//   });

//   describe('redirect depending on valid token', () => {
//     beforeEach(() => {
//       spyOn(MockRouter.prototype, 'navigateByUrl');
//       spyOn(LoginComponent.prototype, 'renewAccessToken');
//     });

//     it('should redirect to home if authenticated', () => {
//       const fixture = TestBed.createComponent(LoginComponent);
//       const loginComponent: LoginComponent = fixture.componentInstance;
//       loginComponent.redirectIfAuthenticated({result: true});
//       expect(MockRouter.prototype.navigateByUrl).toHaveBeenCalledWith('/');
//     });

//     it('should try to renew access token', () => {
//       const fixture = TestBed.createComponent(LoginComponent);
//       const loginComponent: LoginComponent = fixture.componentInstance;
//       loginComponent.redirectIfAuthenticated({result: false});
//       expect(LoginComponent.prototype.renewAccessToken).toHaveBeenCalled();
//     });
//   });

//   describe('login', () => {
//     beforeEach(() => {
//       spyOn(LoginComponent.prototype, 'getToken');
//     });

//     it('should log in user', () => {
//       const fixture = TestBed.createComponent(LoginComponent);
//       const loginComponent: LoginComponent = fixture.componentInstance;
//       loginComponent.model = new Login('John', 'doe', false);
//       loginComponent.login();
//       expect(LoginComponent.prototype.getToken).toHaveBeenCalled();
//     });
//   });

//   describe('other', () => {
//     beforeEach(() => {
//       spyOn(LoginComponent.prototype, 'setToken');
//     });

//     it('should call set token after receiving authorization code', () => {
//       const fixture = TestBed.createComponent(LoginComponent);
//       const loginComponent: LoginComponent = fixture.componentInstance;
//       loginComponent.getToken('abcd');
//       expect(LoginComponent.prototype.setToken).toHaveBeenCalled();
//     });

//     it('should call set token after receiving authorization code', () => {
//       const fixture = TestBed.createComponent(LoginComponent);
//       const loginComponent: LoginComponent = fixture.componentInstance;
//       loginComponent.renewAccessToken();
//       expect(LoginComponent.prototype.setToken).toHaveBeenCalled();
//     });
//   });
// });
