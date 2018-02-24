import { MenuComponent } from './menu.component';
import { TestBed, async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockRouter } from '../../../mocks/MockRouter';

describe('components/menu/menu.component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule
      ],
      declarations: [
        MenuComponent
      ],
      providers: [
        { provide: Router, useClass: MockRouter }
      ]
    });
    TestBed.compileComponents();
  }));

  it('should render menu', () => {
    const fixture = TestBed.createComponent(MenuComponent);
    fixture.detectChanges();
    const menu = fixture.nativeElement;
    const links = menu.querySelectorAll('a');
    expect(links.length).toEqual(4);
  });
});
