import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, FormBuilder } from '@angular/forms';
import { AdminRoutingModule } from './routing.module';
import { AdminHomeComponent } from './components/home/home.component';
import { AdminAuthorizationService } from './services/admin.authorization.service';
import { AdminUserService } from './services/admin.user.service';
import { AdminAuthorizationComponent } from './components/authorization/authorization.component';
import { AuthorizationGroupComponent } from './components/authorization-group/authorization-group.component';
import { AuthorizationRoleComponent } from './components/authorization-role/authorization-role.component';
import { AdminUsersComponent } from './components/users/users.component';
import { AdminUserComponent } from './components/user/user.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminHomeComponent,
    AdminAuthorizationComponent,
    AuthorizationGroupComponent,
    AuthorizationRoleComponent,
    AdminUsersComponent,
    AdminUserComponent
  ],
  providers: [
    FormBuilder,
    AdminAuthorizationService,
    AdminUserService
  ]
})
export class AdminModule {}
