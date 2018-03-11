import { Observable } from 'rxjs/Observable';
import { HttpResponse } from '@angular/common/http';
import { Category } from '../app/modules/library/models/category.model';
import { EmptyResponse } from '../app/utils/empty-response.model';

export class MockCategoryService {
  getAllCategories(username: string, accessToken: string): Observable<HttpResponse<Category[]>> {
    const httpResponse: HttpResponse<Category[]> = new HttpResponse({
      body: [
        {
          id: 'aaa',
          name: 'Architecture',
          knowledges: [
            {
              id: 'kaa',
              creator: 'John Doe',
              title: 'Hexagonale',
              content: 'Known as port and adapter',
            },
            {
              id: 'kbb',
              creator: 'John Doe',
              title: 'CQRS',
              content: 'Segregation of command and query'
            }
          ]
        },
        {
          id: 'bbb',
          name: 'SOLID',
          knowledges: [
            {
              id: 'kcc',
              creator: 'Foo Bar',
              title: 'Single responsibility principle',
              content: 'A thing must have one reason to change'
            },
            {
              id: 'kcd',
              creator: 'Foo Bar',
              title: 'Open close principle',
              content: 'Open to extension, closed to modification'
            }
          ]
        }
      ],
      status: 200
    });

    return Observable.create(observer => observer.next(httpResponse));
  }

  createCategory(username: string, accessToken: string, categoryName: string) {
    const httpResponse: HttpResponse<EmptyResponse[]> = new HttpResponse({
      status: 200
    });

    return Observable.create(observer => observer.next(httpResponse));
  }

  searchCategories(username: string, accessToken: string, categoryName: string): Observable<HttpResponse<Category[]>> {
    const httpResponse: HttpResponse<Category[]> = new HttpResponse({
      body: [
        {
          "id": "aab",
          "name": "CQRS",
          "knowledges": []
        } 
      ],
      status: 200
    });

    return Observable.create(observer => observer.next(httpResponse));
  }

  updateCategory(username: string, accessToken: string, categoryId: string, categoryName: string) { }

  deleteCategory(username: string, accessToken: string, categoryId: string) { }
}
