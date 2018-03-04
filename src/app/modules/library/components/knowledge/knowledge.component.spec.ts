import { TestBed, async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { MockRouter } from '../../../../../mocks/MockRouter';
import { EmptyResponse } from '../../../../utils/empty-response.model';
import { MockCookieService } from '../../../../../mocks/MockCookieService';
import { COOKIES } from '../../../../config/keys.config';
import { Knowledge } from '../../models/knowledge.model';
import { KnowledgeComponent } from './knowledge.component';
import { CommentComponent } from '../comment/comment.component';
import { ScoreComponent } from '../score/score.component';
import { CookieService } from '../../../../services/browser/cookie.service';
import { CommentService } from '../../services/comment.service';
import { ScoreService } from '../../services/score.service';
import { MockCommentService } from '../../../../../mocks/MockCommentService';
import { MockScoreService } from '../../../../../mocks/MockScoreService';
import { Comment } from '../../models/comment.model';
import { Score } from '../../models/score.model';

describe('modules/library/components/knowledge/knowledge.component', () => {
  const knowledge: Knowledge = {
    id: 'kaa',
    creator: 'John Doe',
    title: 'Hexagonale',
    content: 'Known as port and adapter'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        KnowledgeComponent,
        CommentComponent,
        ScoreComponent
      ],
      providers: [
        { provide: CookieService, useClass: MockCookieService },
        { provide: CommentService, useClass: MockCommentService },
        { provide: ScoreService, useClass: MockScoreService }
      ]
    });
    TestBed.compileComponents();
  }));

  describe('rendering', () => {
    it('should render a knowledge', () => {
      const fixture = TestBed.createComponent(KnowledgeComponent);
      fixture.componentInstance.knowledge = knowledge;
      fixture.detectChanges();
      const knowledgeComponent = fixture.nativeElement;
      expect(knowledgeComponent.querySelector('.knowledge-content').innerText).toBe('Known as port and adapter');
    });
  });

  describe('initialization', () => {
    beforeEach(() => {
      spyOn(MockCommentService.prototype, 'getCommentsByContentId').and.callFake((username: string, accessToken: string, contentId: string) => {
        const httpResponse: HttpResponse<Comment[]> = new HttpResponse({
          body: [
            {
              id: 'caa',
              commenter: 'John Doe',
              contentType: 'KNOWLEDGE',
              contentId: 'kaa',
              content: 'This is a very good architecture'
            }
          ],
          status: 200
        });

        return Observable.create(observer => observer.next(httpResponse));
      });
      spyOn(MockScoreService.prototype, 'getScoresByContentId').and.callFake((username: string, accessToken: string, contentId: string) => {
        const httpResponse: HttpResponse<Score[]> = new HttpResponse({
          body: [
            {
              id: 'saa',
              giver: 'John Doe',
              contentType: 'KNOWLEDGE',
              contentId: 'kaa',
              mark: 5
            }
          ],
          status: 200
        });

        return Observable.create(observer => observer.next(httpResponse));
      });
      spyOn(CookieService.prototype, 'getCookie').and.callFake((name: string) => {
        if (name === COOKIES.username)
          return 'john@doe.fr';
        else
          return 'bbb';
      });
    });

    it('should get all comments of knowledge', () => {
      const fixture = TestBed.createComponent(KnowledgeComponent);
      const knowledgeComponent: KnowledgeComponent = fixture.componentInstance;
      fixture.componentInstance.knowledge = knowledge;
      knowledgeComponent.ngOnInit();

      expect(knowledgeComponent.comments).toEqual([
        {
          id: 'caa',
          commenter: 'John Doe',
          contentType: 'KNOWLEDGE',
          contentId: 'kaa',
          content: 'This is a very good architecture'
        }
      ]);
    });

    it('should get all scores of knowledge', () => {
      const fixture = TestBed.createComponent(KnowledgeComponent);
      const knowledgeComponent: KnowledgeComponent = fixture.componentInstance;
      fixture.componentInstance.knowledge = knowledge;
      knowledgeComponent.ngOnInit();

      expect(knowledgeComponent.scores).toEqual([
        {
          id: 'saa',
          giver: 'John Doe',
          contentType: 'KNOWLEDGE',
          contentId: 'kaa',
          mark: 5
        }
      ]);
    });
  });
});
