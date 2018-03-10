import { TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { MockCookieService } from '../../../../../mocks/MockCookieService';
import { COOKIES } from '../../../../config/keys.config';
import { CookieService } from '../../../../services/browser/cookie.service';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScoreModalComponent } from './score-modal.component';
import { ScoreService } from '../../services/score.service';
import { MockScoreService } from '../../../../../mocks/MockScoreService';
import { EmptyResponse } from '../../../../utils/empty-response.model';
import { Score } from '../../forms/score.form';

describe('modules/library/components/comment-modal/comment-modal.component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        BrowserAnimationsModule
      ],
      declarations: [
        ScoreModalComponent
      ],
      providers: [
        { provide: CookieService, useClass: MockCookieService },
        { provide: ScoreService, useClass: MockScoreService }
      ]
    });
    TestBed.compileComponents();
  }));

  describe('rendering', () => {
    it('should render modal to add a comment', () => {
      const fixture = TestBed.createComponent(ScoreModalComponent);
      fixture.componentInstance.visible = true;
      fixture.componentInstance.contentId = 'aaa';
      fixture.componentInstance.contentName = 'Architecture';
      fixture.componentInstance.contentType = 'CATEGORY';
      fixture.detectChanges();
      const commentModalComponent = fixture.nativeElement;
      expect(commentModalComponent.querySelector('h1').innerText).toBe('NOTE');
      expect(commentModalComponent.querySelector('h2').innerText).toBe('Architecture');
    });
  });

  describe('initialization', () => {
    beforeEach(() => {
      spyOn(MockScoreService.prototype, 'addScore').and.callFake((username: string, accessToken: string, contentType: string, contentId: string, mark: number) => {
        const httpResponse: HttpResponse<EmptyResponse> = new HttpResponse({
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

    it('should create a new comment when validating', () => {
      const fixture = TestBed.createComponent(ScoreModalComponent);
      const scoreModalComponent: ScoreModalComponent = fixture.componentInstance;
      fixture.componentInstance.contentId = 'aaa';
      fixture.componentInstance.contentName = 'Architecture';
      fixture.componentInstance.contentType = 'CATEGORY';
      fixture.componentInstance.model = new Score(4);
      
      scoreModalComponent.addScore();

      expect(MockScoreService.prototype.addScore).toHaveBeenCalledWith('john@doe.fr', 'bbb', 'CATEGORY', 'aaa', 4);
    });
  });
});
