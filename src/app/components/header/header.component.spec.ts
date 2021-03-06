import { HeaderComponent } from './header.component';
import { TestBed, async } from '@angular/core/testing';

describe('components/header.header.component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent
      ]
    });
    TestBed.compileComponents();
  }));

  it('should render header', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    const header = fixture.nativeElement;
    expect(header.querySelector('img').getAttribute('src')).toBe('/assets/logo-combe.png');
  });
});
