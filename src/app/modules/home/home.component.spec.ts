import { HomeComponent } from './home.component';
import { TestBed, async } from '@angular/core/testing';

describe('home component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent
      ]
    });
    TestBed.compileComponents();
  }));

  it('should render HOME', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const homeElement = fixture.nativeElement;
    expect(homeElement.querySelector('div').textContent.trim()).toContain('Administration du portfolio de Cyril PHAM-LE');
  });
});
