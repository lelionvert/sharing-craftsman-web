import { TestBed, async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { MockRouter } from '../../../../../mocks/MockRouter';
import { EmptyResponse } from '../../../../utils/empty-response.model';
import { MockCookieService } from '../../../../../mocks/MockCookieService';
import { COOKIES } from '../../../../config/keys.config';
import { CookieService } from '../../../../services/browser/cookie.service';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { MockCategoryService } from '../../../../../mocks/MockCategoryService';
import { CategoryComponent } from './category.component';
import { KnowledgeComponent } from '../knowledge/knowledge.component';
import { CommentComponent } from '../comment/comment.component';
import { ScoreComponent } from '../score/score.component';

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
        FormsModule
      ],
      declarations: [
        CategoryComponent,
        KnowledgeComponent,
        CommentComponent,
        ScoreComponent
      ],
      providers: [
        { provide: CookieService, useClass: MockCookieService },
        { provide: CategoryService, useClass: MockCategoryService }
      ]
    });
    TestBed.compileComponents();
  }));

  describe('rendering', () => {
    it('should render a category', () => {
      const fixture = TestBed.createComponent(CategoryComponent);
      fixture.componentInstance.category = category;
      fixture.detectChanges();
      const loginComponent = fixture.nativeElement;
      expect(loginComponent.querySelector('h3').innerText).toBe('ARCHITECTURE');
    });
  });

  // describe('get categories', () => {
  //   beforeEach(() => {
  //     spyOn(CategoryService.prototype, 'getAllCategories').and.callFake((username: string, accessToken: string) => {
  //       const httpResponse: HttpResponse<Category[]> = new HttpResponse({
  //         body: [
  //           {
  //             id: 'aaa',
  //             name: 'Architecture',
  //             knowledges: [
  //               {
  //                 id: 'kaa',
  //                 creator: 'John Doe',
  //                 title: 'Hexagonale',
  //                 content: 'Known as port and adapter',
  //               },
  //               {
  //                 id: 'kbb',
  //                 creator: 'John Doe',
  //                 title: 'CQRS',
  //                 content: 'Segregation of command and query'
  //               }
  //             ]
  //           },
  //           {
  //             id: 'bbb',
  //             name: 'SOLID',
  //             knowledges: [
  //               {
  //                 id: 'kcc',
  //                 creator: 'Foo Bar',
  //                 title: 'Single responsibility principle',
  //                 content: 'A thing must have one reason to change'
  //               },
  //               {
  //                 id: 'kcd',
  //                 creator: 'Foo Bar',
  //                 title: 'Open close principle',
  //                 content: 'Open to extension, closed to modification'
  //               }
  //             ]
  //           }
  //         ],
  //         status: 200
  //       });

  //       return Observable.create(observer => observer.next(httpResponse));
  //     });
  //     spyOn(CookieService.prototype, 'getCookie').and.callFake((name: string) => {
  //       if (name === COOKIES.username)
  //         return 'john@doe.fr';
  //       else
  //         return 'bbb';
  //     });
  //   });

  //   it('should get all categories when initializing', () => {
  //     const fixture = TestBed.createComponent(LibraryComponent);
  //     const libraryComponent: LibraryComponent = fixture.componentInstance;
  //     libraryComponent.ngOnInit();

  //     expect(libraryComponent.categories).toEqual([
  //       {
  //         id: 'aaa',
  //         name: 'Architecture',
  //         knowledges: [
  //           {
  //             id: 'kaa',
  //             creator: 'John Doe',
  //             title: 'Hexagonale',
  //             content: 'Known as port and adapter',
  //           },
  //           {
  //             id: 'kbb',
  //             creator: 'John Doe',
  //             title: 'CQRS',
  //             content: 'Segregation of command and query'
  //           }
  //         ]
  //       },
  //       {
  //         id: 'bbb',
  //         name: 'SOLID',
  //         knowledges: [
  //           {
  //             id: 'kcc',
  //             creator: 'Foo Bar',
  //             title: 'Single responsibility principle',
  //             content: 'A thing must have one reason to change'
  //           },
  //           {
  //             id: 'kcd',
  //             creator: 'Foo Bar',
  //             title: 'Open close principle',
  //             content: 'Open to extension, closed to modification'
  //           }
  //         ]
  //       }
  //     ]);
  //   });
  // });
});
