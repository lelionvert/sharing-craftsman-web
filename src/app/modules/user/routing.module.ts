import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { LostPasswordComponent } from './components/lost-password/lost-password.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';

const userRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegistrationComponent
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent
  },
  {
    path: 'lost-password',
    component: LostPasswordComponent
  },
  {
    path: 'update-profile',
    component: UpdateProfileComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(userRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class UserRoutingModule { }
