import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';

import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';

import { UserRoutingModule } from './routing.module';
import { UserService } from './services/user.service';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { LostPasswordComponent } from './components/lost-password/lost-password.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule
  ],
  declarations: [
    LoginComponent,
    RegistrationComponent,
    ChangePasswordComponent,
    LostPasswordComponent
  ],
  providers: [
    FormBuilder,
    UserService
  ]
})
export class UserModule {}
