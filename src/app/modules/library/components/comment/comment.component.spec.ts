import { TestBed, async } from '@angular/core/testing';
import { CommentComponent } from './comment.component';
import { Comment } from '../../models/comment.model';

describe('modules/library/components/comment/comment.component', () => {
  const comment: Comment = {
    id: 'cdd',
    commenter: 'Mr Smith',
    contentType: 'CATEGORY',
    contentId: 'aaa',
    content: 'Very important topic'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      declarations: [
        CommentComponent
      ],
      providers: [
      ]
    });
    TestBed.compileComponents();
  }));

  describe('rendering', () => {
    it('should render a comment', () => {
      const fixture = TestBed.createComponent(CommentComponent);
      fixture.componentInstance.comment = comment;
      fixture.detectChanges();
      const commentComponent = fixture.nativeElement;
      expect(commentComponent.querySelector('.commenter').innerText).toBe('Mr Smith');
      expect(commentComponent.querySelector('.comment-content').innerText).toBe('Very important topic');
    });
  });
});
