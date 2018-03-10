import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { HeaderService } from '../../../services/browser/header.service';
import { CLIENT_NAME, CLIENT_SECRET } from '../../../config/keys.config';
import { HOST, BACK_END_ROUTES } from '../../../config/api.config';
import { Category } from '../models/category.model';

@Injectable()
export class CategoryService {
  constructor(private http: HttpClient, private headerService: HeaderService) { }

  getAllCategories(username: String, accessToken: String): Observable<HttpResponse<Category[]>> {
    return this.http.get<Category[]>(
      `${HOST}/${BACK_END_ROUTES.library.getCategories}`,
      { observe: 'response', headers: this.getUserHeaders(username, accessToken) }
    );
  }

  getCategoryById(username: String, accessToken: String, categoryId: String): Observable<HttpResponse<Category>> {
    return this.http.get<Category>(
      `${HOST}/${BACK_END_ROUTES.library.getCategories}/${categoryId}`,
      { observe: 'response', headers: this.getUserHeaders(username, accessToken) }
    )
  }

  searchCategories(username: String, accessToken: String, searchCriteria: any): Observable<HttpResponse<Category[]>> {
    return this.http.post<Category[]>(
      `${HOST}/${BACK_END_ROUTES.library.searchCategories}`,
      {
        searchKeys: searchCriteria
      },
      { observe: 'response', headers: this.getUserHeaders(username, accessToken) }
    );
  }

  createCategory(username: String, accessToken: String, categoryName: String) {
    return this.http.post(
      `${HOST}/${BACK_END_ROUTES.library.categories}`,
      {
        name: categoryName
      },
      { observe: 'response', headers: this.getUserHeaders(username, accessToken) }
    );
  }

  updateCategory(username: String, accessToken: String, categoryId: String, categoryName: String) {
    return this.http.put(
      `${HOST}/${BACK_END_ROUTES.library.categories}`,
      {
        id: categoryId,
        name: categoryName
      },
      { observe: 'response', headers: this.getUserHeaders(username, accessToken) }
    );
  }

  deleteCategory(username: String, accessToken: String, categoryId: String) {
    return this.http.delete(
      `${HOST}/${BACK_END_ROUTES.library.categories}/${categoryId}`,
      { observe: 'response', headers: this.getUserHeaders(username, accessToken) }
    )
  }

  private getUserHeaders(username: String, token: String) {
    return this.headerService
      .buildHeaders()
      .withClientName(CLIENT_NAME)
      .withClientSecret(CLIENT_SECRET)
      .withUsername(username)
      .withAccessToken(token)
      .get();
  }
}