import { TestBed, async } from '@angular/core/testing';
import { AdminHomeComponent } from './home.component';

describe('modules/admin/components/home.component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AdminHomeComponent
      ]
    });
    TestBed.compileComponents();
  }));

  it('should render homepage', () => {
    const fixture = TestBed.createComponent(AdminHomeComponent);
    fixture.detectChanges();
    const homeElement = fixture.nativeElement;
    const links = homeElement.querySelectorAll('a');
    expect(links.length).toEqual(2);
  });
});
