import { MockBackend } from '@angular/http/testing';
import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject, async } from '@angular/core/testing';
import { HeaderService } from '../../../services/browser/header.service';
import { HOST, HEADERS, BACK_END_ROUTES } from '../../../config/api.config';
import { CommentService } from './comment.service';
import { Comment } from '../models/comment.model';

describe('modules/library/services/comment.service', () => {
  let service: CommentService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CommentService,
        HeaderService
      ]
    });

    service = TestBed.get(CommentService);
    httpMock = TestBed.get(HttpTestingController);
  }));

  afterEach(() => {
    httpMock.verify();
  });

  it('should get all comments of content by content id', () => {
    const comments: Comment[] = [
      {
        id: 'caa',
        commenter: 'john@doe.fr',
        contentType: 'KNOWLEDGE',
        contentId: 'aaa',
        content: 'My comment'
      },
      {
        id: 'cbb',
        commenter: "foo@bar.fr",
        contentType: 'KNOWLEDGE',
        contentId: 'aaa',
        content: 'My other comment'
      }
    ];

    service.getCommentsByContentId('john@doe.fr', 'aaa', 'aaa').subscribe(response => {
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(comments);
    });

    const req = httpMock.expectOne(`${HOST}/${BACK_END_ROUTES.library.getCommentByContentId}/aaa`);
    expect(req.request.method).toBe('GET');
    req.flush(comments);
  });

  it('should get a comment by its id', () => {
    const comment: Comment = {
      id: 'caa',
      commenter: 'john@doe.fr',
      contentType: 'KNOWLEDGE',
      contentId: 'aaa',
      content: 'My comment'
    };

    service.getCommentsById('john@doe.fr', 'aaa', 'caa').subscribe(response => {
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(comment);
    });

    const req = httpMock.expectOne(`${HOST}/${BACK_END_ROUTES.library.comments}/caa`);
    expect(req.request.method).toBe('GET');
    req.flush(comment);
  });

  it('should create a new comment', () => {
    service.addComment('john@doe.fr', 'aaa', 'CATEGORY', 'ccc', 'My comment').subscribe(response => {
      expect(response.status).toEqual(200);
    });

    const req = httpMock.expectOne(`${HOST}/${BACK_END_ROUTES.library.comments}`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should update a comment', () => {
    service.updateComment('john@doe.fr', 'aaa', 'caa', 'CATEGORY', 'ccc', 'My comment').subscribe(response => {
      expect(response.status).toEqual(200);
    });

    const req = httpMock.expectOne(`${HOST}/${BACK_END_ROUTES.library.comments}`);
    expect(req.request.method).toBe('PUT');
    req.flush({});
  });

  it('should delete a comment', () => {
    service.deleteComment('john@doe.fr', 'aaa', 'caa').subscribe(response => {
      expect(response.status).toEqual(200);
    });

    const req = httpMock.expectOne(`${HOST}/${BACK_END_ROUTES.library.deleteComment}`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });
});
