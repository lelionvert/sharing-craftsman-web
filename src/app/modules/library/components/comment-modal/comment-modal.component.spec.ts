import { TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { MockCookieService } from '../../../../../mocks/MockCookieService';
import { COOKIES } from '../../../../config/keys.config';
import { CookieService } from '../../../../services/browser/cookie.service';
import { CommentService } from '../../services/comment.service';
import { MockCommentService } from '../../../../../mocks/MockCommentService';
import { CommentModalComponent } from './comment-modal.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmptyResponse } from '../../../../utils/empty-response.model';
import { Comment } from '../../forms/comment.form';

describe('modules/library/components/comment-modal/comment-modal.component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        BrowserAnimationsModule
      ],
      declarations: [
        CommentModalComponent
      ],
      providers: [
        { provide: CookieService, useClass: MockCookieService },
        { provide: CommentService, useClass: MockCommentService }
      ]
    });
    TestBed.compileComponents();
  }));

  describe('rendering', () => {
    it('should render modal to add a comment', () => {
      const fixture = TestBed.createComponent(CommentModalComponent);
      fixture.componentInstance.visible = true;
      fixture.componentInstance.contentId = 'aaa';
      fixture.componentInstance.contentName = 'Architecture';
      fixture.componentInstance.contentType = 'CATEGORY';
      fixture.detectChanges();
      const commentModalComponent = fixture.nativeElement;
      expect(commentModalComponent.querySelector('h1').innerText).toBe('COMMENTAIRE');
      expect(commentModalComponent.querySelector('h2').innerText).toBe('Architecture');
    });
  });

  describe('add comment', () => {
    beforeEach(() => {
      spyOn(MockCommentService.prototype, 'addComment').and.callFake((username: string, accessToken: string, contentType: string, contentId: string, comment: string) => {
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

    it('should create a new comment when validating', () => {
      const fixture = TestBed.createComponent(CommentModalComponent);
      const commentModalComponent: CommentModalComponent = fixture.componentInstance;
      fixture.componentInstance.contentId = 'aaa';
      fixture.componentInstance.contentName = 'Architecture';
      fixture.componentInstance.contentType = 'CATEGORY';
      fixture.componentInstance.model = new Comment('This is my comment');
      
      commentModalComponent.addComment();

      expect(MockCommentService.prototype.addComment).toHaveBeenCalledWith('john@doe.fr', 'bbb', 'CATEGORY', 'aaa', 'This is my comment');
    });
  });
});
