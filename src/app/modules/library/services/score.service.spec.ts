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
import { ScoreService } from './score.service';
import { Score } from '../models/score.model';

describe('modules/library/services/score.service', () => {
  let service: ScoreService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ScoreService,
        HeaderService
      ]
    });

    service = TestBed.get(ScoreService);
    httpMock = TestBed.get(HttpTestingController);
  }));

  afterEach(() => {
    httpMock.verify();
  });

  it('should get all scores of content by content id', () => {
    const scores: Score[] = [
      {
        id: 'caa',
        giver: 'john@doe.fr',
        contentType: 'KNOWLEDGE',
        contentId: 'aaa',
        mark: 3
      },
      {
        id: 'cbb',
        giver: "foo@bar.fr",
        contentType: 'KNOWLEDGE',
        contentId: 'aaa',
        mark: 4
      }
    ];

    service.getScoresByContentId('john@doe.fr', 'aaa', 'aaa').subscribe(response => {
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(scores);
    });

    const req = httpMock.expectOne(`${HOST}/${BACK_END_ROUTES.library.getScoresByContentId}/aaa`);
    expect(req.request.method).toBe('GET');
    req.flush(scores);
  });

  it('should get all scores which have a given mark', () => {
    const scores: Score[] = [
      {
        id: 'caa',
        giver: 'john@doe.fr',
        contentType: 'CATEGORY',
        contentId: 'bbb',
        mark: 4
      },
      {
        id: 'cbb',
        giver: "foo@bar.fr",
        contentType: 'KNOWLEDGE',
        contentId: 'aaa',
        mark: 4
      }
    ];

    service.getScoresByMark('john@doe.fr', 'aaa', 4).subscribe(response => {
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(scores);
    });

    const req = httpMock.expectOne(`${HOST}/${BACK_END_ROUTES.library.getScoresByMark}/4`);
    expect(req.request.method).toBe('GET');
    req.flush(scores);
  });

  it('should add a new score to a content', () => {
    service.addScore('john@doe.fr', 'aaa', 'CATEGORY', 'ccc', 4).subscribe(response => {
      expect(response.status).toEqual(200);
    });

    const req = httpMock.expectOne(`${HOST}/${BACK_END_ROUTES.library.scores}`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should update a score', () => {
    service.updateScore('john@doe.fr', 'aaa', 'saa', 'CATEGORY', 'ccc', 3).subscribe(response => {
      expect(response.status).toEqual(200);
    });

    const req = httpMock.expectOne(`${HOST}/${BACK_END_ROUTES.library.scores}`);
    expect(req.request.method).toBe('PUT');
    req.flush({});
  });

  it('should delete a score', () => {
    service.deleteScore('john@doe.fr', 'aaa', 'saa').subscribe(response => {
      expect(response.status).toEqual(200);
    });

    const req = httpMock.expectOne(`${HOST}/${BACK_END_ROUTES.library.deleteScore}`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });
});
