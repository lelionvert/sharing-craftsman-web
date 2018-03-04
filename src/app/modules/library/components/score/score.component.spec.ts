import { TestBed, async } from '@angular/core/testing';
import { Score } from '../../models/score.model';
import { ScoreComponent } from './score.component';

describe('modules/library/components/score/score.component', () => {
  const score: Score = {
    id: 'saa',
    giver: 'John Doe',
    contentType: 'KNOWLEDGE',
    contentId: 'kaa',
    mark: 5
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      declarations: [
        ScoreComponent
      ],
      providers: [
      ]
    });
    TestBed.compileComponents();
  }));

  describe('rendering', () => {
    it('should render a comment', () => {
      const fixture = TestBed.createComponent(ScoreComponent);
      fixture.componentInstance.score = score;
      fixture.detectChanges();
      const scoreComponent = fixture.nativeElement;
      expect(scoreComponent.querySelector('li').innerText).toBe('John Doe : 5');
    });
  });
});
