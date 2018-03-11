import { TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { MockCookieService } from '../../../../../mocks/MockCookieService';
import { COOKIES } from '../../../../config/keys.config';
import { CookieService } from '../../../../services/browser/cookie.service';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmptyResponse } from '../../../../utils/empty-response.model';
import { KnowledgeDeleteModalComponent } from './knowledge-delete-modal.component';
import { KnowledgeService } from '../../services/knowledge.service';
import { MockKnowledgeService } from '../../../../../mocks/MockKnowledgeService';

describe('modules/library/components/knowledge-delete-modal/knowledge-delete-modal.component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        BrowserAnimationsModule
      ],
      declarations: [
        KnowledgeDeleteModalComponent
      ],
      providers: [
        { provide: CookieService, useClass: MockCookieService },
        { provide: KnowledgeService, useClass: MockKnowledgeService }
      ]
    });
    TestBed.compileComponents();
  }));

  describe('rendering', () => {
    it('should render modal to delete a knowledge', () => {
      const fixture = TestBed.createComponent(KnowledgeDeleteModalComponent);
      fixture.componentInstance.visible = true;
      fixture.componentInstance.categoryId = 'aaa';
      fixture.componentInstance.knowledgeId = 'kaa';
      fixture.componentInstance.knowledgeTitle = 'CQRS';
      fixture.detectChanges();
      const commentModalComponent = fixture.nativeElement;
      expect(commentModalComponent.querySelector('h1').innerText).toBe('SUPPRESSION DE PRINCIPE');
      expect(commentModalComponent.querySelector('form span').innerText).toBe('Es-tu bien sûr de vouloir supprimer le principe CQRS ?');
    });
  });

  describe('delete knowledge', () => {
    beforeEach(() => {
      spyOn(MockKnowledgeService.prototype, 'deleteKnowledge').and.callFake((username: string, accessToken: string, categoryId: string, knowledgeId: string) => {
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

    it('should delete a knowledge', () => {
      const fixture = TestBed.createComponent(KnowledgeDeleteModalComponent);
      const knowledgeModalComponent: KnowledgeDeleteModalComponent = fixture.componentInstance;
      fixture.componentInstance.categoryId = 'aaa'; 
      fixture.componentInstance.knowledgeId = 'kaa'; 
      
      knowledgeModalComponent.deleteKnowledge();

      expect(MockKnowledgeService.prototype.deleteKnowledge).toHaveBeenCalledWith('john@doe.fr', 'bbb', 'aaa', 'kaa');
    });
  });
});
