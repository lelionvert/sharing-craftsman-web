// import { Injectable } from '@angular/core';
// import { 
//   HttpClient, 
//   HttpHeaders, 
//   HttpResponse, 
//   HttpErrorResponse 
// } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';

// import { HOST, HEADERS } from '../config/api.config';
// import { User } from '../models/User';

// @Injectable()
// export class HTTPService {
//   private headers: HttpHeaders;

//   constructor(private http: HttpClient) {
//     this.headers = new HttpHeaders();
//     this.headers.set('Content-Type', 'application/json');
//   }

//   setClientHeaders(name, secret) {
//     this.headers.set(HEADERS.client, name);
//     this.headers.set(HEADERS.secret, secret);
//   }

//   setUsernameHeader(username) {
//     this.headers.set(HEADERS.username, username);
//   }

//   setTokenHeader(token) {
//     this.headers.set(HEADERS.token, token);
//   }

//   getUsers() {
//     return this.http.get(`${HOST}/users`);
//   }

//   getAllResources(path: string): Observable<HttpResponse<User[]>> {
//     return this.http.get<User[]>(`${HOST}/${path}`, { observe: 'response', headers: this.headers });
//   }

//   // getOneResource(path: string, resourceId: number, authenticationSchemas: string[], options?: any): Observable<any> {
//   //   return this.http.get(HOST + API_PREFIX + path + '/' + resourceId, new RequestOptions({ headers: this.getHeaders(authenticationSchemas, options) }))
//   //                   .map(this.extractData)
//   //                   .catch(this.handleError);
//   // }

//   // postResource(path: string, resource: any, authenticationSchemas: string[], options?: any): Observable<any> {
//   //   return this.http.post(HOST + API_PREFIX + path, resource, new RequestOptions({ headers: this.getHeaders(authenticationSchemas, options) }))
//   //                   .map(this.extractData)
//   //                   .catch(this.handleError);
//   // }

//   // putResource(path: string, resource: any, authenticationSchemas: string[], options?: any): Observable<any> {
//   //   return this.http.put(HOST + API_PREFIX + path + '/' + resource.id, resource, new RequestOptions({ headers: this.getHeaders(authenticationSchemas, options) }))
//   //                   .map(this.extractData)
//   //                   .catch(this.handleError);
//   // }

//   // deleteResource(path: string, resourceId: number, authenticationSchemas: string[], options?: any): Observable<any> {
//   //   return this.http.delete(HOST + API_PREFIX + path + '/' + resourceId, new RequestOptions({ headers: this.getHeaders(authenticationSchemas, options) }))
//   //                   .map(this.extractData)
//   //                   .catch(this.handleError);
//   // }

//   private extractData(res: any) {
//     let body = res.json();
//     return body || { };
//   }

//   private handleError (error: HttpErrorResponse) {
//     if (error.error instanceof ErrorEvent) {
//       return { error: `An error occurred: ${error.error.message}` };
//     } else {
//       return { error: `Backend returned code ${error.status}, body was: ${error.error}` };
//     }
//   }
// }
