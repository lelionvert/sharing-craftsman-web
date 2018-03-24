import { TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
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
import { KnowledgeUpdateModalComponent } from '../knowledge-update-modal/knowledge-update-modal.component';
import { CommentModalComponent } from '../comment-modal/comment-modal.component';
import { ScoreModalComponent } from '../score-modal/score-modal.component';
import { KnowledgeDeleteModalComponent } from '../knowledge-delete-modal/knowledge-delete-modal.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KnowledgeService } from '../../services/knowledge.service';
import { MockKnowledgeService } from '../../../../../mocks/MockKnowledgeService';
import { MockFavoriteService } from '../../../../../mocks/MockFavoriteService';
import { EmptyResponse } from '../../../../utils/empty-response.model';
import { FavoriteService } from '../../services/favorite.service';
import { Favorite } from '../../models/favorite.model';
import { AuthorizationService } from '../../../../services/authorization/authorization.service';
import { MockAuthorizationService } from '../../../../../mocks/MockAuthorizationService';

describe('modules/library/components/knowledge/knowledge.component', () => {
  const knowledge: Knowledge = {
    id: 'kaa',
    creator: 'John Doe',
    title: 'Hexagonale',
    content: 'Known as port and adapter'
  };

  const favorites = [
    {
      "id": "sab",
      "username": "john@doe.fr",
      "contentType": "CATEGORY",
      "contentId": "aaa"
    },
    {
      "id": "saa",
      "username": "john@doe.fr",
      "contentType": "KNOWLEDGE",
      "contentId": "kaa"
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        BrowserAnimationsModule
      ],
      declarations: [
        KnowledgeComponent,
        CommentComponent,
        ScoreComponent,
        CommentModalComponent,
        ScoreModalComponent,
        KnowledgeUpdateModalComponent,
        KnowledgeDeleteModalComponent
      ],
      providers: [
        { provide: CookieService, useClass: MockCookieService },
        { provide: CommentService, useClass: MockCommentService },
        { provide: ScoreService, useClass: MockScoreService },
        { provide: KnowledgeService, useClass: MockKnowledgeService },
        { provide: FavoriteService, useClass: MockFavoriteService },
        { provide: AuthorizationService, useClass: MockAuthorizationService }
      ]
    });
    TestBed.compileComponents();

    spyOn(MockCookieService.prototype, 'getCookie').and.callFake((name: string) => {
      if (name === COOKIES.username)
        return 'john@doe.fr';
      else
        return 'bbb';
    });

    spyOn(MockFavoriteService.prototype, 'getFavorites').and.callFake((username: string, accessToken: string) => {
      const httpResponse: HttpResponse<Favorite[]> = new HttpResponse({
        body: favorites,
        status: 200
      });

      return Observable.create(observer => observer.next(httpResponse));
    });
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
      spyOn(MockCommentService.prototype, 'getCommentsByContentId').and.callFake((contentId: string) => {
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
      spyOn(MockScoreService.prototype, 'getScoresByContentId').and.callFake((contentId: string) => {
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

    it('should detect if knowledge is in favorites', () => {
      const fixture = TestBed.createComponent(KnowledgeComponent);
      const knowledgeComponent: KnowledgeComponent = fixture.componentInstance;
      fixture.componentInstance.knowledge = knowledge;

      knowledgeComponent.ngOnInit();

      expect(MockFavoriteService.prototype.getFavorites).toHaveBeenCalledWith('john@doe.fr', 'bbb');
      expect(knowledgeComponent.isFavorite).toBe(true);
    });
  });

  describe('favorites', () => {
    beforeEach(() => {
      spyOn(MockFavoriteService.prototype, 'addToMyFavorites').and.callFake((username: string, accessToken: string, contentType: string, contentId: string) => {
        const httpResponse: HttpResponse<EmptyResponse> = new HttpResponse({
          status: 200
        });

        return Observable.create(observer => observer.next(httpResponse));
      });

      spyOn(MockFavoriteService.prototype, 'deleteFavorite').and.callFake((username: string, accessToken: string, favoriteId: string) => {
        const httpResponse: HttpResponse<EmptyResponse> = new HttpResponse({
          status: 200
        });

        return Observable.create(observer => observer.next(httpResponse));
      });
    });

    it('should add knowledge to my favorites', () => {
      const fixture = TestBed.createComponent(KnowledgeComponent);
      const knowledgeComponent: KnowledgeComponent = fixture.componentInstance;
      fixture.componentInstance.knowledge = knowledge;

      knowledgeComponent.onAddToFavorites();

      expect(MockFavoriteService.prototype.addToMyFavorites).toHaveBeenCalledWith('john@doe.fr', 'bbb', 'KNOWLEDGE', 'kaa');
    });

    it('should remove knowledge from my favorites', () => {
      const fixture = TestBed.createComponent(KnowledgeComponent);
      const knowledgeComponent: KnowledgeComponent = fixture.componentInstance;
      fixture.componentInstance.knowledge = knowledge;
      knowledgeComponent.ngOnInit();

      knowledgeComponent.onRemoveFromFavorites();

      expect(MockFavoriteService.prototype.deleteFavorite).toHaveBeenCalledWith('john@doe.fr', 'bbb', 'saa');
    });
  });
});
