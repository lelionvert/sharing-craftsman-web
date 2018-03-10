import { Observable } from 'rxjs/Observable';
import { HttpResponse } from '@angular/common/http';
import { EmptyResponse } from '../app/utils/empty-response.model';

export class MockKnowledgeService {
  addKnowledgeToCategory(username: string, accessToken: string, categoryId: string, knowledgeTitle: string, knowledgeContent: string) {
    const httpResponse: HttpResponse<EmptyResponse[]> = new HttpResponse({
      status: 200
    });

    return Observable.create(observer => observer.next(httpResponse));
  }
}
