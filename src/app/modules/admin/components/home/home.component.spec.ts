import { TestBed, async } from '@angular/core/testing';
import { AdminHomeComponent } from './home.component';
import { MockRouter } from '../../../../../mocks/MockRouter';
import { Router } from '@angular/router';
import { MockAuthorizationService } from '../../../../../mocks/MockAuthorizationService';
import { AuthorizationService } from '../../../../services/authorization/authorization.service';

describe('modules/admin/components/home.component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AdminHomeComponent
      ],
      providers: [
        { provide: Router, useClass: MockRouter },
        { provide: AuthorizationService, useClass: MockAuthorizationService }
      ]
    });
    TestBed.compileComponents();
  }));

  it('should render homepage', () => {
    const fixture = TestBed.createComponent(AdminHomeComponent);
    fixture.detectChanges();
    const homeElement = fixture.nativeElement;
    const links = homeElement.querySelectorAll('a');
    expect(links.length).toEqual(3);
  });
});
