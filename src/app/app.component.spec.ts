import { Component } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { AppComponent } from './app.component';
import { routing } from './routes';

@Component({selector: 'sc-header', template: ''})
class MockHeaderComponent {}
@Component({selector: 'sc-menu', template: ''})
class MockMenuComponent {}

describe('Main Component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        routing
      ],
      declarations: [
        AppComponent,
        MockHeaderComponent,
        MockMenuComponent
      ],
      providers: [{provide: APP_BASE_HREF, useValue : '/' }]
    });
    TestBed.compileComponents();
  }));

  it('should render the header and menu', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const main = fixture.nativeElement;
    expect(main.querySelector('sc-header')).toBeDefined();
    expect(main.querySelector('sc-menu')).toBeDefined();
  });
});
