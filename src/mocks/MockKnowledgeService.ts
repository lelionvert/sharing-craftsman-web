import { Observable } from 'rxjs/Observable';
import { HttpResponse } from '@angular/common/http';
import { EmptyResponse } from '../app/utils/empty-response.model';
import { Knowledge } from '../app/modules/library/models/knowledge.model';

export class MockKnowledgeService {
  getKnowledgeById(username: string, accessToken: string, knowledgeId: string) {
    const httpResponse: HttpResponse<Knowledge> = new HttpResponse({
      body: {
        "id": "kbb",
        "creator": "John Doe",
        "title": "CQRS",
        "content": "Segregation of command and query"
      },
      status: 200
    });

    return Observable.create(observer => observer.next(httpResponse));
  }

  addKnowledgeToCategory(username: string, accessToken: string, categoryId: string, knowledgeTitle: string, knowledgeContent: string) {
    const httpResponse: HttpResponse<EmptyResponse[]> = new HttpResponse({
      status: 200
    });

    return Observable.create(observer => observer.next(httpResponse));
  }

  updateKnowledge(username: string, accessToken: string, categoryId: string, knowledgeId: string, knowledgeTitle: string, knowledgeContent: string) { }

  deleteKnowledge(username: string, accessToken: string, categoryId: string, knowledgeId: string) { }
}
