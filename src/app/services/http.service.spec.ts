// import { MockBackend } from '@angular/http/testing';
// import {
//   HttpClient,
//   HttpHeaders,
//   HttpResponse,
//   HttpErrorResponse
// } from '@angular/common/http';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { TestBed, inject, async } from '@angular/core/testing';
// import { HTTPService } from './http.service';
// import { HOST, HEADERS } from '../config/api.config';

// class MockHTTP extends HttpClient {
//   constructor(backend) {
//     super(backend);
//   }
// }

// describe('http service', () => {
//   let service: HTTPService;
//   let httpMock: HttpTestingController;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [HTTPService]
//     });

//     service = TestBed.get(HTTPService);
//     httpMock = TestBed.get(HttpTestingController);
//   }));

//   afterEach(() => {
//     httpMock.verify();
//   });

//   it('should return resources', () => {
//     const dummyUsers = [
//       { login: 'John' },
//       { login: 'Doe' }
//     ];

//     service.getAllResources('users').subscribe(users => {
//       console.log(users.headers);
//       expect(users.body).toEqual(dummyUsers);
//     });

//     const req = httpMock.expectOne(`${HOST}/users`);
//     expect(req.request.method).toBe("GET");
//     req.flush(dummyUsers);
//   });
// });
