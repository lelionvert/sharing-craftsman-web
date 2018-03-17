import { TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { MockCookieService } from '../../../../../mocks/MockCookieService';
import { COOKIES } from '../../../../config/keys.config';
import { CookieService } from '../../../../services/browser/cookie.service';
import { FavoritesComponent } from './favorites.component';
import { MockFavoriteService } from '../../../../../mocks/MockFavoriteService';
import { Favorite } from '../../models/favorite.model';
import { MockCategoryService } from '../../../../../mocks/MockCategoryService';
import { MockKnowledgeService } from '../../../../../mocks/MockKnowledgeService';
import { Category } from '../../models/category.model';
import { FavoriteService } from '../../services/favorite.service';
import { CategoryService } from '../../services/category.service';
import { KnowledgeService } from '../../services/knowledge.service';
import { CategoryComponent } from '../category/category.component';
import { KnowledgeComponent } from '../knowledge/knowledge.component';
import { ScoreComponent } from '../score/score.component';
import { CommentComponent } from '../comment/comment.component';
import { CommentModalComponent } from '../comment-modal/comment-modal.component';
import { ScoreModalComponent } from '../score-modal/score-modal.component';
import { CategoryUpdateModalComponent } from '../category-update-modal/category-update-modal.component';
import { CategoryDeleteModalComponent } from '../category-delete-modal/category-delete-modal.component';
import { KnowledgeUpdateModalComponent } from '../knowledge-update-modal/knowledge-update-modal.component';
import { KnowledgeDeleteModalComponent } from '../knowledge-delete-modal/knowledge-delete-modal.component';
import { FormsModule } from '@angular/forms';
import { CommentService } from '../../services/comment.service';
import { MockCommentService } from '../../../../../mocks/MockCommentService';
import { ScoreService } from '../../services/score.service';
import { MockScoreService } from '../../../../../mocks/MockScoreService';
import { AuthorizationService } from '../../../../services/authorization/authorization.service';
import { MockAuthorizationService } from '../../../../../mocks/MockAuthorizationService';

describe('modules/library/components/favorites/favorites.component', () => {
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
        FavoritesComponent,
        CategoryComponent,
        KnowledgeComponent,
        ScoreComponent,
        CommentComponent,
        CommentModalComponent,
        ScoreModalComponent,
        CategoryUpdateModalComponent,
        CategoryDeleteModalComponent,
        KnowledgeUpdateModalComponent,
        KnowledgeDeleteModalComponent
      ],
      providers: [
        { provide: CookieService, useClass: MockCookieService },
        { provide: FavoriteService, useClass: MockFavoriteService },
        { provide: CategoryService, useClass: MockCategoryService },
        { provide: KnowledgeService, useClass: MockKnowledgeService },
        { provide: CommentService, useClass: MockCommentService },
        { provide: ScoreService, useClass: MockScoreService },
        { provide: AuthorizationService, useClass: MockAuthorizationService }
      ]
    });
    TestBed.compileComponents();
  }));

  describe('rendering', () => {
    it('should render favorites page', () => {
      const fixture = TestBed.createComponent(FavoritesComponent);
      fixture.detectChanges();
      const favoriteComponent = fixture.nativeElement;
      expect(favoriteComponent.querySelector('h1').innerText).toBe('FAVORIS');
    });
  });

  describe('initialization', () => {
    beforeEach(() => {
      spyOn(MockFavoriteService.prototype, 'getFavorites').and.callFake((username: string, accessToken: string) => {
        const httpResponse: HttpResponse<Favorite[]> = new HttpResponse({
          body: favorites,
          status: 200
        });

        return Observable.create(observer => observer.next(httpResponse));
      });

      spyOn(MockCategoryService.prototype, 'getCategoryById').and.callFake((username: string, accessToken: string, categoryId: string) => {
        const httpResponse: HttpResponse<Category> = new HttpResponse({
          body: {
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
          status: 200
        });

        return Observable.create(observer => observer.next(httpResponse));
      });

      spyOn(MockKnowledgeService.prototype, 'getKnowledgeById').and.callFake((username: string, accessToken: string, knowledgeId: string) => {
        const httpResponse: HttpResponse<Category> = new HttpResponse({
          body: {
            id: 'bbb',
            name: 'SOLID',
            knowledges: [
              {
                id: 'kcc',
                creator: 'Foo Bar',
                title: 'Single responsibility principle',
                content: 'A thing must have one reason to change'
              }
            ]
          },
          status: 200
        });

        return Observable.create(observer => observer.next(httpResponse));
      });
      
      spyOn(MockCookieService.prototype, 'getCookie').and.callFake((name: string) => {
        if (name === COOKIES.username)
          return 'john@doe.fr';
        else
          return 'bbb';
      });
    });

    it('should get all favorites of current user', () => {
      const fixture = TestBed.createComponent(FavoritesComponent);
      const favoritesComponent: FavoritesComponent = fixture.componentInstance;
      
      favoritesComponent.ngOnInit();

      expect(favoritesComponent.categories).toEqual([
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
            }
          ]
        }
      ]);
      expect(MockFavoriteService.prototype.getFavorites).toHaveBeenCalledWith('john@doe.fr', 'bbb');
      expect(MockCategoryService.prototype.getCategoryById).toHaveBeenCalledWith('john@doe.fr', 'bbb', 'aaa');
      expect(MockKnowledgeService.prototype.getKnowledgeById).toHaveBeenCalledWith('john@doe.fr', 'bbb', 'kcc');
    });
  });
});
