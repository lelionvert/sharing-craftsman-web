import { TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { MockCookieService } from '../../../../../mocks/MockCookieService';
import { COOKIES } from '../../../../config/keys.config';
import { CookieService } from '../../../../services/browser/cookie.service';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmptyResponse } from '../../../../utils/empty-response.model';
import { KnowledgeUpdateModalComponent } from './knowledge-update-modal.component';
import { KnowledgeService } from '../../services/knowledge.service';
import { MockKnowledgeService } from '../../../../../mocks/MockKnowledgeService';
import { Knowledge } from '../../forms/knowledge.form';

describe('modules/library/components/knowledge-update-modal/knowledge-update-modal.component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        BrowserAnimationsModule
      ],
      declarations: [
        KnowledgeUpdateModalComponent
      ],
      providers: [
        { provide: CookieService, useClass: MockCookieService },
        { provide: KnowledgeService, useClass: MockKnowledgeService }
      ]
    });
    TestBed.compileComponents();
  }));

  describe('rendering', () => {
    it('should render modal to edit a knowledge', () => {
      const fixture = TestBed.createComponent(KnowledgeUpdateModalComponent);
      fixture.componentInstance.visible = true;
      fixture.componentInstance.categoryId = 'aaa';
      fixture.componentInstance.knowledgeId = 'kaa';
      fixture.componentInstance.knowledgeTitle = 'CQRS';
      fixture.componentInstance.knowledgeContent = 'Command query responsibility segregation';
      fixture.detectChanges();
      const commentModalComponent = fixture.nativeElement;
      expect(commentModalComponent.querySelector('h1').innerText).toBe('EDITION DE PRINCIPE CRAFT');
    });
  });

  describe('update category', () => {
    beforeEach(() => {
      spyOn(MockKnowledgeService.prototype, 'updateKnowledge').and.callFake((username: string, accessToken: string, categoryId: string, knowledgeId: string, knowledgeTitle: string, knowledgeContent: string) => {
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

    it('should update a knowledge', () => {
      const fixture = TestBed.createComponent(KnowledgeUpdateModalComponent);
      const knowledgeModalComponent: KnowledgeUpdateModalComponent = fixture.componentInstance;
      fixture.componentInstance.categoryId = 'aaa';
      fixture.componentInstance.knowledgeId = 'kaa';
      fixture.componentInstance.model = new Knowledge('', '', 'CQRS revisited', 'Blou');
      
      knowledgeModalComponent.updateKnowledge();

      expect(MockKnowledgeService.prototype.updateKnowledge).toHaveBeenCalledWith('john@doe.fr', 'bbb', 'aaa', 'kaa', 'CQRS revisited', 'Blou');
    });
  });
});
