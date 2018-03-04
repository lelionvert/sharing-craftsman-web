import { Observable } from 'rxjs/Observable';
import { HttpResponse } from '@angular/common/http';
import { Score } from '../app/modules/library/models/score.model';

export class MockScoreService {
  getScoresByContentId(username: string, accessToken: string, contentId: string): Observable<HttpResponse<Score[]>> {
    const httpResponse: HttpResponse<Score[]> = new HttpResponse({
      body: [
        {
          id: 'scc',
          giver: 'John Doe',
          contentType: 'CATEGORY',
          contentId: 'aaa',
          mark: 5
        }
      ],
      status: 200
    });

    return Observable.create(observer => observer.next(httpResponse));
  }
}
