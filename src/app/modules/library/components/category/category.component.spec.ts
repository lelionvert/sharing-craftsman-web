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
import { CommentModalComponent } from '../comment-modal/comment-modal.component';
import { FormsModule } from '@angular/forms';
import { ScoreModalComponent } from '../score-modal/score-modal.component';
import { MockCategoryService } from '../../../../../mocks/MockCategoryService';
import { CategoryUpdateModalComponent } from '../category-update-modal/category-update-modal.component';
import { CategoryDeleteModalComponent } from '../category-delete-modal/category-delete-modal.component';
import { KnowledgeUpdateModalComponent } from '../knowledge-update-modal/knowledge-update-modal.component';
import { KnowledgeDeleteModalComponent } from '../knowledge-delete-modal/knowledge-delete-modal.component';
import { KnowledgeService } from '../../services/knowledge.service';
import { MockKnowledgeService } from '../../../../../mocks/MockKnowledgeService';
import { MockFavoriteService } from '../../../../../mocks/MockFavoriteService';
import { Favorite } from '../../models/favorite.model';
import { FavoriteService } from '../../services/favorite.service';
import { EmptyResponse } from '../../../../utils/empty-response.model';
import { AuthorizationService } from '../../../../services/authorization/authorization.service';
import { MockAuthorizationService } from '../../../../../mocks/MockAuthorizationService';

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
      "contentId": "kcc"
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        CategoryComponent,
        KnowledgeComponent,
        CommentComponent,
        ScoreComponent,
        CommentModalComponent,
        ScoreModalComponent,
        CategoryUpdateModalComponent,
        CategoryDeleteModalComponent,
        KnowledgeUpdateModalComponent,
        KnowledgeDeleteModalComponent
      ],
      providers: [
        { provide: CookieService, useClass: MockCookieService },
        { provide: CommentService, useClass: MockCommentService },
        { provide: ScoreService, useClass: MockScoreService },
        { provide: CategoryService, useClass: MockCategoryService },
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

    it('should detect if category is in favorites', () => {
      const fixture = TestBed.createComponent(CategoryComponent);
      const categoryComponent: CategoryComponent = fixture.componentInstance;
      fixture.componentInstance.category = category;

      categoryComponent.ngOnInit();

      expect(MockFavoriteService.prototype.getFavorites).toHaveBeenCalledWith('john@doe.fr', 'bbb');
      expect(categoryComponent.isFavorite).toBe(true);
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

    it('should add category to my favorites', () => {
      const fixture = TestBed.createComponent(CategoryComponent);
      const categoryComponent: CategoryComponent = fixture.componentInstance;
      fixture.componentInstance.category = category;

      categoryComponent.onAddToFavorites();

      expect(MockFavoriteService.prototype.addToMyFavorites).toHaveBeenCalledWith('john@doe.fr', 'bbb', 'CATEGORY', 'aaa');
    });

    it('should remove category from my favorites', () => {
      const fixture = TestBed.createComponent(CategoryComponent);
      const categoryComponent: CategoryComponent = fixture.componentInstance;
      fixture.componentInstance.category = category;
      categoryComponent.ngOnInit();

      categoryComponent.onRemoveFromFavorites();

      expect(MockFavoriteService.prototype.deleteFavorite).toHaveBeenCalledWith('john@doe.fr', 'bbb', 'sab');
    });
  });
});
