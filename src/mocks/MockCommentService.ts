import { Observable } from 'rxjs/Observable';
import { HttpResponse } from '@angular/common/http';
import { Comment } from '../app/modules/library/models/comment.model';

export class MockCommentService {
  getCommentsByContentId(username: string, accessToken: string, contentId: string): Observable<HttpResponse<Comment[]>> {
    const httpResponse: HttpResponse<Comment[]> = new HttpResponse({
      body: [
        {
          id: 'cdd',
          commenter: 'Mr Smith',
          contentType: 'CATEGORY',
          contentId: 'aaa',
          content: 'Very important topic'
        }
      ],
      status: 200
    });

    return Observable.create(observer => observer.next(httpResponse));
  }
}
