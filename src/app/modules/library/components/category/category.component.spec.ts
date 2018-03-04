import { TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { MockCookieService } from '../../../../../mocks/MockCookieService';
import { COOKIES } from '../../../../config/keys.config';
import { CookieService } from '../../../../services/browser/cookie.service';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { Comment } from '../../models/comment.model';
import { Score } from '../../models/score.model';
import { CategoryComponent } from './category.component';
import { KnowledgeComponent } from '../knowledge/knowledge.component';
import { CommentComponent } from '../comment/comment.component';
import { ScoreComponent } from '../score/score.component';
import { CommentService } from '../../services/comment.service';
import { ScoreService } from '../../services/score.service';
import { MockCommentService } from '../../../../../mocks/MockCommentService';
import { MockScoreService } from '../../../../../mocks/MockScoreService';

describe('modules/library/components/category/category.component', () => {
  const category: Category = {
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
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      declarations: [
        CategoryComponent,
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
    it('should render a category', () => {
      const fixture = TestBed.createComponent(CategoryComponent);
      fixture.componentInstance.category = category;
      fixture.detectChanges();
      const categoryComponent = fixture.nativeElement;
      expect(categoryComponent.querySelector('h3').innerText).toBe('ARCHITECTURE');
    });
  });

  describe('initialization', () => {
    beforeEach(() => {
      spyOn(MockCommentService.prototype, 'getCommentsByContentId').and.callFake((username: string, accessToken: string, contentId: string) => {
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
      });
      spyOn(MockScoreService.prototype, 'getScoresByContentId').and.callFake((username: string, accessToken: string, contentId: string) => {
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
      });
      spyOn(CookieService.prototype, 'getCookie').and.callFake((name: string) => {
        if (name === COOKIES.username)
          return 'john@doe.fr';
        else
          return 'bbb';
      });
    });

    it('should get all comments of category', () => {
      const fixture = TestBed.createComponent(CategoryComponent);
      const categoryComponent: CategoryComponent = fixture.componentInstance;
      fixture.componentInstance.category = category;
      categoryComponent.ngOnInit();

      expect(categoryComponent.comments).toEqual([
        {
          id: 'cdd',
          commenter: 'Mr Smith',
          contentType: 'CATEGORY',
          contentId: 'aaa',
          content: 'Very important topic'
        }
      ]);
    });

    it('should get all scores of category', () => {
      const fixture = TestBed.createComponent(CategoryComponent);
      const categoryComponent: CategoryComponent = fixture.componentInstance;
      fixture.componentInstance.category = category;
      categoryComponent.ngOnInit();

      expect(categoryComponent.scores).toEqual([
        {
          id: 'scc',
          giver: 'John Doe',
          contentType: 'CATEGORY',
          contentId: 'aaa',
          mark: 5
        }
      ]);
    });
  });
});
