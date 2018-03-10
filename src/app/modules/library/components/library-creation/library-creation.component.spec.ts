import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { MockCookieService } from '../../../../../mocks/MockCookieService';
import { COOKIES } from '../../../../config/keys.config';
import { CookieService } from '../../../../services/browser/cookie.service';
import { LibraryCreationComponent } from './library-creation.component';
import { CategoryService } from '../../services/category.service';
import { EmptyResponse } from '../../../../utils/empty-response.model';
import { MockCategoryService } from '../../../../../mocks/MockCategoryService';
import { MockKnowledgeService } from '../../../../../mocks/MockKnowledgeService';
import { Category } from '../../models/category.model';
import { Knowledge } from '../../forms/knowledge.form';
import { Router } from '@angular/router';
import { MockRouter } from '../../../../../mocks/MockRouter';
import { KnowledgeService } from '../../services/knowledge.service';
import { SEARCH_KEYS } from '../../../../config/app.config';

describe('modules/library/components/library-creation/library-creation.component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        LibraryCreationComponent
      ],
      providers: [
        { provide: Router, useClass: MockRouter },
        { provide: CookieService, useClass: MockCookieService },
        { provide: CategoryService, useClass: MockCategoryService },
        { provide: KnowledgeService, useClass: MockKnowledgeService }
      ]
    });
    TestBed.compileComponents();

    spyOn(MockCookieService.prototype, 'getCookie').and.callFake((name: string) => {
      if (name === COOKIES.username)
        return 'john@doe.fr';
      else
        return 'aaa';
    });
  }));

  describe('rendering', () => {
    it('should render form to create a knowledge', () => {
      const fixture = TestBed.createComponent(LibraryCreationComponent);
      fixture.detectChanges();
      const loginComponent = fixture.nativeElement;
      expect(loginComponent.querySelector('h1').innerText).toBe('AJOUT D\'UN PRINCIPE CRAFT');
    });
  });

  describe('component initialization', () => {
    beforeEach(() => {
      spyOn(MockCategoryService.prototype, 'getAllCategories').and.callFake((username: string, accessToken: string) => {
        const httpResponse: HttpResponse<Category[]> = new HttpResponse({
          body: [
            {
              id: 'aaa',
              name: 'Architecture',
              knowledges: []
            },
            {
              id: 'aab',
              name: 'SOLID',
              knowledges: []
            },
            {
              id: 'aac',
              name: 'Design Patterns',
              knowledges: []
            }
          ],
          status: 200
        });

        return Observable.create(observer => observer.next(httpResponse));
      });
    });

    it('should get categories when initialization', () => {
      const fixture = TestBed.createComponent(LibraryCreationComponent);
      const libraryCreationComponent: LibraryCreationComponent = fixture.componentInstance;

      libraryCreationComponent.ngOnInit();

      expect(MockCategoryService.prototype.getAllCategories).toHaveBeenCalledWith('john@doe.fr', 'aaa');
    });
  });

  describe('library creation', () => {
    beforeEach(() => {
      spyOn(MockCategoryService.prototype, 'createCategory').and.callFake((username: string, accessToken: string, categoryName: string) => {
        const httpResponse: HttpResponse<EmptyResponse[]> = new HttpResponse({
          status: 200
        });

        return Observable.create(observer => observer.next(httpResponse));
      });

      spyOn(MockCategoryService.prototype, 'searchCategories').and.callFake((username: string, accessToken: string, categoryName: string) => {
        const httpResponse: HttpResponse<Category[]> = new HttpResponse({
          body: [
            {
              "id": "aab",
              "name": "CQRS",
              "knowledges": []
            }
          ],
          status: 200
        });

        return Observable.create(observer => observer.next(httpResponse));
      });

      spyOn(MockKnowledgeService.prototype, 'addKnowledgeToCategory').and.callFake((username: string, accessToken: string, categoryId: string, knowledgeTitle: string, knowledgeContent: string) => {
        const httpResponse: HttpResponse<EmptyResponse[]> = new HttpResponse({
          status: 200
        });

        return Observable.create(observer => observer.next(httpResponse));
      });

      spyOn(MockRouter.prototype, 'navigateByUrl');
    });

    it('should create a new knowledge with a new category', () => {
      const fixture = TestBed.createComponent(LibraryCreationComponent);
      const libraryCreationComponent: LibraryCreationComponent = fixture.componentInstance;
      libraryCreationComponent.model = new Knowledge('', 'CQRS', 'Command', 'This is a command part');

      libraryCreationComponent.create();

      const searchCriteria = {};
      searchCriteria[SEARCH_KEYS.categoryName] = 'CQRS';
      expect(MockCategoryService.prototype.createCategory).toHaveBeenCalledWith('john@doe.fr', 'aaa', 'CQRS');
      expect(MockCategoryService.prototype.searchCategories).toHaveBeenCalledWith('john@doe.fr', 'aaa', searchCriteria);
      expect(MockKnowledgeService.prototype.addKnowledgeToCategory).toHaveBeenCalledWith('john@doe.fr', 'aaa', 'aab', 'Command', 'This is a command part');
      expect(MockRouter.prototype.navigateByUrl).toHaveBeenCalledWith('/library');
    });

    it('should create a new knowledge with an existing category', () => {
      const fixture = TestBed.createComponent(LibraryCreationComponent);
      const libraryCreationComponent: LibraryCreationComponent = fixture.componentInstance;
      libraryCreationComponent.model = new Knowledge('aab', 'CQRS', 'Command', 'This is a command part');

      libraryCreationComponent.create();

      const searchCriteria = {};
      searchCriteria[SEARCH_KEYS.categoryName] = 'CQRS';
      expect(MockKnowledgeService.prototype.addKnowledgeToCategory).toHaveBeenCalledWith('john@doe.fr', 'aaa', 'aab', 'Command', 'This is a command part');
      expect(MockRouter.prototype.navigateByUrl).toHaveBeenCalledWith('/library');
    });
  });

  describe('cancel creation', () => {
    beforeEach(() => {
      spyOn(MockRouter.prototype, 'navigateByUrl');
    });

    it('should return to library when cancelling creation', () => {
      const fixture = TestBed.createComponent(LibraryCreationComponent);
      const libraryCreationComponent: LibraryCreationComponent = fixture.componentInstance;

      libraryCreationComponent.cancel();

      expect(MockRouter.prototype.navigateByUrl).toHaveBeenCalledWith('/library');
    });
  });
});
