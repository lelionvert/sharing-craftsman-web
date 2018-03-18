import { MenuComponent } from './menu.component';
import { TestBed, async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockRouter } from '../../../mocks/MockRouter';
import { LogoutService } from '../../services/user/logout.service';
import { MockLogoutService } from '../../../mocks/MockLogoutService';
import { AuthorizationService } from '../../services/authorization/authorization.service';
import { MockAuthorizationService } from '../../../mocks/MockAuthorizationService';

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
        { provide: Router, useClass: MockRouter },
        { provide: LogoutService, useClass: MockLogoutService },
        { provide: AuthorizationService, useClass: MockAuthorizationService }
      ]
    });
    TestBed.compileComponents();
  }));

  it('should render menu', () => {
    const fixture = TestBed.createComponent(MenuComponent);
    fixture.detectChanges();
    const menu = fixture.nativeElement;
    const links = menu.querySelectorAll('a');
    expect(links.length).toEqual(7);
  });

  describe('disconnexion', () => {
    beforeEach(() => {
      spyOn(MockLogoutService.prototype, 'logout');
    });
    
    it('should logout user when clicking on disconnect', () => {
      const fixture = TestBed.createComponent(MenuComponent);
      const menu: MenuComponent = fixture.componentInstance;
      menu.disconnect();
      expect(MockLogoutService.prototype.logout).toHaveBeenCalled();
    });
  });
});
