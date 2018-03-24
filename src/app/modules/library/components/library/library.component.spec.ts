import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { LibraryComponent } from './library.component';
import { LibrarySearchComponent } from '../library-search/library-search.component';
import { CategoryComponent } from '../category/category.component';
import { KnowledgeComponent } from '../knowledge/knowledge.component';
import { CommentComponent } from '../comment/comment.component';
import { ScoreComponent } from '../score/score.component';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { MockCategoryService } from '../../../../../mocks/MockCategoryService';
import { CommentService } from '../../services/comment.service';
import { MockCommentService } from '../../../../../mocks/MockCommentService';
import { MockScoreService } from '../../../../../mocks/MockScoreService';
import { ScoreService } from '../../services/score.service';
import { CommentModalComponent } from '../comment-modal/comment-modal.component';
import { ScoreModalComponent } from '../score-modal/score-modal.component';
import { CategoryUpdateModalComponent } from '../category-update-modal/category-update-modal.component';
import { CategoryDeleteModalComponent } from '../category-delete-modal/category-delete-modal.component';
import { KnowledgeUpdateModalComponent } from '../knowledge-update-modal/knowledge-update-modal.component';
import { KnowledgeDeleteModalComponent } from '../knowledge-delete-modal/knowledge-delete-modal.component';
import { KnowledgeService } from '../../services/knowledge.service';
import { MockKnowledgeService } from '../../../../../mocks/MockKnowledgeService';
import { FavoritesComponent } from '../favorites/favorites.component';
import { FavoriteService } from '../../services/favorite.service';
import { MockFavoriteService } from '../../../../../mocks/MockFavoriteService';
import { AuthorizationService } from '../../../../services/authorization/authorization.service';
import { MockAuthorizationService } from '../../../../../mocks/MockAuthorizationService';
import { CookieService } from '../../../../services/browser/cookie.service';
import { MockCookieService } from '../../../../../mocks/MockCookieService';

describe('modules/library/components/library/library.component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        LibraryComponent,
        LibrarySearchComponent,
        CategoryComponent,
        KnowledgeComponent,
        CommentComponent,
        ScoreComponent,
        CommentModalComponent,
        ScoreModalComponent,
        CategoryUpdateModalComponent,
        CategoryDeleteModalComponent,
        KnowledgeUpdateModalComponent,
        KnowledgeDeleteModalComponent,
        FavoritesComponent
      ],
      providers: [
        { provide: CookieService, useClass: MockCookieService },
        { provide: CategoryService, useClass: MockCategoryService },
        { provide: CommentService, useClass: MockCommentService },
        { provide: ScoreService, useClass: MockScoreService },
        { provide: KnowledgeService, useClass: MockKnowledgeService },
        { provide: FavoriteService, useClass: MockFavoriteService },
        { provide: AuthorizationService, useClass: MockAuthorizationService }
      ]
    });
    TestBed.compileComponents();
  }));

  describe('rendering', () => {
    it('should render library component', () => {
      const fixture = TestBed.createComponent(LibraryComponent);
      fixture.detectChanges();
      const loginComponent = fixture.nativeElement;
      expect(loginComponent.querySelector('h1').innerText).toBe('THE KNOWLEDGE LIBRARY');
      expect(loginComponent.querySelector('h2').innerText).toBe('THE PLACE WHERE YOU GET YOUR CRAFTSMAN THINGS');
    });
  });

  describe('get categories', () => {
    beforeEach(() => {
      spyOn(CategoryService.prototype, 'getAllCategories').and.callFake((username: string, accessToken: string) => {
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
      });
    });

    it('should get all categories when initializing', () => {
      const fixture = TestBed.createComponent(LibraryComponent);
      const libraryComponent: LibraryComponent = fixture.componentInstance;
      libraryComponent.ngOnInit();

      expect(libraryComponent.categories).toEqual([
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
      ]);
    });
  });
});
