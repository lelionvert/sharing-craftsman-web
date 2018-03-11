import { TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { MockCookieService } from '../../../../../mocks/MockCookieService';
import { COOKIES } from '../../../../config/keys.config';
import { CookieService } from '../../../../services/browser/cookie.service';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmptyResponse } from '../../../../utils/empty-response.model';
import { CategoryService } from '../../services/category.service';
import { MockCategoryService } from '../../../../../mocks/MockCategoryService';
import { CategoryDeleteModalComponent } from './category-delete-modal.component';

describe('modules/library/components/category-delete-modal/category-delete-modal.component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        BrowserAnimationsModule
      ],
      declarations: [
        CategoryDeleteModalComponent
      ],
      providers: [
        { provide: CookieService, useClass: MockCookieService },
        { provide: CategoryService, useClass: MockCategoryService }
      ]
    });
    TestBed.compileComponents();
  }));

  describe('rendering', () => {
    it('should render modal to delete a category', () => {
      const fixture = TestBed.createComponent(CategoryDeleteModalComponent);
      fixture.componentInstance.visible = true;
      fixture.componentInstance.categoryId = 'aaa';
      fixture.componentInstance.categoryName = 'Architecture';
      fixture.detectChanges();
      const commentModalComponent = fixture.nativeElement;
      expect(commentModalComponent.querySelector('h1').innerText).toBe('SUPPRESSION DE CATÉGORIE');
      expect(commentModalComponent.querySelector('h2').innerText).toBe('Architecture');
    });
  });

  describe('delete category', () => {
    beforeEach(() => {
      spyOn(MockCategoryService.prototype, 'deleteCategory').and.callFake((username: string, accessToken: string, categoryId: string) => {
        const httpResponse: HttpResponse<EmptyResponse[]> = new HttpResponse({
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

    it('should update a category', () => {
      const fixture = TestBed.createComponent(CategoryDeleteModalComponent);
      const categoryModalComponent: CategoryDeleteModalComponent = fixture.componentInstance;
      fixture.componentInstance.categoryId = 'aaa'; 
      
      categoryModalComponent.deleteCategory();

      expect(MockCategoryService.prototype.deleteCategory).toHaveBeenCalledWith('john@doe.fr', 'bbb', 'aaa');
    });
  });
});
