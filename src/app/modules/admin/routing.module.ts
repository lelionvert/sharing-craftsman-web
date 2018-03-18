import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './components/home/home.component';
import { AdminAuthorizationComponent } from './components/authorization/authorization.component';
import { AdminUsersComponent } from './components/users/users.component';
import { AdminUserAuthorizationsComponent } from './components/user-authorizations/user-authorizations.component';

const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminHomeComponent
  },
  {
    path: 'admin-authorizations',
    component: AdminAuthorizationComponent
  },
  {
    path: 'admin-users',
    component: AdminUsersComponent
  },
  {
    path: 'admin-user-authorizations',
    component: AdminUserAuthorizationsComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
