import { Component } from '@angular/core';
import { AuthorizationService } from '../../../../services/authorization/authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'sc-admin-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class AdminHomeComponent {
  private isAdmin: boolean = false;

  constructor(
    private router: Router,
    private authorizationService: AuthorizationService
  ) { 
    this.checkIfAdmin();
  }

  private checkIfAdmin() {
    this.authorizationService
      .getRoles()
      .subscribe(response => this.handleGetRolesResponse(response.body))
  }

  private handleGetRolesResponse(groups) {
    groups.groups.forEach(group => {
      const hasAdminRole = group.roles.findIndex(role => role.name === 'ROLE_ADMIN');
      if (hasAdminRole !== -1) {
        this.isAdmin = true;
      }
    });

    if (!this.isAdmin)
      this.router.navigateByUrl('/');
  }
}
