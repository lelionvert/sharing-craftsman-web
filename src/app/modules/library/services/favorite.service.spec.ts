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
import { FavoriteService } from './favorite.service';
import { Favorite } from '../models/favorite.model';

describe('modules/library/services/favorite.service', () => {
  let service: FavoriteService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        FavoriteService,
        HeaderService
      ]
    });

    service = TestBed.get(FavoriteService);
    httpMock = TestBed.get(HttpTestingController);
  }));

  afterEach(() => {
    httpMock.verify();
  });

  it('should get all of user', () => {
    const favorites: Favorite[] = [
      {
        id: 'saa',
        username: 'john@doe.fr',
        contentType: 'KNOWLEDGE',
        contentId: 'aaa'
      }
    ];

    service.getFavorites('john@doe.fr', 'aaa').subscribe(response => {
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(favorites);
    });

    const req = httpMock.expectOne(`${HOST}/${BACK_END_ROUTES.library.getFavorites}`);
    expect(req.request.method).toBe('POST');
    req.flush(favorites);
  });

  it('should create a new favorite', () => {
    service.addToMyFavorites('john@doe.fr', 'aaa', 'CATEGORY', 'ccc').subscribe(response => {
      expect(response.status).toEqual(200);
    });

    const req = httpMock.expectOne(`${HOST}/${BACK_END_ROUTES.library.favorites}`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should delete a favorite', () => {
    service.deleteFavorite('john@doe.fr', 'aaa', 'faa').subscribe(response => {
      expect(response.status).toEqual(200);
    });

    const req = httpMock.expectOne(`${HOST}/${BACK_END_ROUTES.library.deleteFavorite}`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });
});
