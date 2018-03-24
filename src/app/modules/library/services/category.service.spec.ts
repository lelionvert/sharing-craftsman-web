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
import { CategoryService } from './category.service';
import { Category } from '../models/category.model';
import { Knowledge } from '../models/knowledge.model';

describe('modules/library/services/category.service', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CategoryService,
        HeaderService
      ]
    });

    service = TestBed.get(CategoryService);
    httpMock = TestBed.get(HttpTestingController);
  }));

  afterEach(() => {
    httpMock.verify();
  });

  it('should get all categories', () => {
    const categories: Category[] = [
      {
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
      }
    ];

    service.getAllCategories().subscribe(response => {
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(categories);
    });

    const req = httpMock.expectOne(`${HOST}/${BACK_END_ROUTES.library.getCategories}`);
    expect(req.request.method).toBe('GET');
    req.flush(categories);
  });

  it('should get one category from its id', () => {
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

    service.getCategoryById('john@doe.fr', 'aaa', 'bbb').subscribe(response => {
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(category);
    });

    const req = httpMock.expectOne(`${HOST}/${BACK_END_ROUTES.library.getCategories}/bbb`);
    expect(req.request.method).toBe('GET');
    req.flush(category);
  });

  it('should search categories', () => {
    const categories: Category[] = [
      {
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
      }
    ];
    
    service.searchCategories('john@doe.fr', 'aaa', {
      KnowledgeTitle: 'know',
      CategoryName: 'Arch'
    }).subscribe(response => {
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(categories);
    });

    const req = httpMock.expectOne(`${HOST}/${BACK_END_ROUTES.library.searchCategories}`);
    expect(req.request.method).toBe('POST');
    req.flush(categories);
  });

  it('should create a new category', () => {
    service.createCategory('john@doe.fr', 'aaa', 'Architecture').subscribe(response => {
      expect(response.status).toEqual(200);
    });

    const req = httpMock.expectOne(`${HOST}/${BACK_END_ROUTES.library.categories}`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should update a category', () => {
    service.updateCategory('john@doe.fr', 'aaa', 'caa', 'SOLID').subscribe(response => {
      expect(response.status).toEqual(200);
    });

    const req = httpMock.expectOne(`${HOST}/${BACK_END_ROUTES.library.categories}`);
    expect(req.request.method).toBe('PUT');
    req.flush({});
  });

  it('should delete a category', () => {
    service.deleteCategory('john@doe.fr', 'aaa', 'caa').subscribe(response => {
      expect(response.status).toEqual(200);
    });

    const req = httpMock.expectOne(`${HOST}/${BACK_END_ROUTES.library.categories}/caa`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
