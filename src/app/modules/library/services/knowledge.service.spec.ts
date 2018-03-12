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
import { KnowledgeService } from './knowledge.service';
import { Category } from '../models/category.model';

describe('modules/library/services/category.service', () => {
  let service: KnowledgeService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        KnowledgeService,
        HeaderService
      ]
    });

    service = TestBed.get(KnowledgeService);
    httpMock = TestBed.get(HttpTestingController);
  }));

  afterEach(() => {
    httpMock.verify();
  });

  it('should get one knowledge from its id', () => {
    const category: Category = {
      id: 'bbb',
      name: 'SOLID',
      knowledges: [
        {
          id: 'kaa',
          creator: 'john@doe.fr',
          title: 'My knowledge',
          content: 'My content'
        }
      ]
    };

    service.getKnowledgeById('john@doe.fr', 'aaa', 'bbb').subscribe(response => {
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(category);
    });

    const req = httpMock.expectOne(`${HOST}/${BACK_END_ROUTES.library.getCategories}/bbb`);
    expect(req.request.method).toBe('GET');
    req.flush(category);
  });

  it('should create a new knowledge', () => {
    service.addKnowledgeToCategory('john@doe.fr', 'aaa', 'caa', 'My knowledge', 'My content').subscribe(response => {
      expect(response.status).toEqual(200);
    });

    const req = httpMock.expectOne(`${HOST}/${BACK_END_ROUTES.library.knowledges}`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should update a knowledge', () => {
    service.updateKnowledge('john@doe.fr', 'aaa', 'caa', 'kaa', 'My knowledge', 'My content').subscribe(response => {
      expect(response.status).toEqual(200);
    });

    const req = httpMock.expectOne(`${HOST}/${BACK_END_ROUTES.library.knowledges}`);
    expect(req.request.method).toBe('PUT');
    req.flush({});
  });

  it('should delete a knowledge', () => {
    service.deleteKnowledge('john@doe.fr', 'aaa', 'caa', 'kaa').subscribe(response => {
      expect(response.status).toEqual(200);
    });

    const req = httpMock.expectOne(`${HOST}/${BACK_END_ROUTES.library.deleteKnowledge}`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });
});
