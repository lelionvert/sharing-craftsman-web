import { MenuComponent } from './menu';
import { TestBed, async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MockRouter } from '../../../mocks/MockRouter';

describe('menu component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MenuComponent
      ],
      providers: [
        { provide: Router, useClass: MockRouter }
      ]
    });
    TestBed.compileComponents();
  }));

  describe('as disconnected', () => {
    it('should render menu', () => {
      const fixture = TestBed.createComponent(MenuComponent);
      fixture.detectChanges();
      const menu = fixture.nativeElement;
      const links = menu.querySelectorAll('a');
      expect(links.length).toEqual(1);
    });
  });
});
