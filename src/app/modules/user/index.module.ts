import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';

import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';

import { UserRoutingModule } from './routing.module';
import { UserService } from './services/user.service';
import { RequestChangePasswordComponent } from './components/request-change-password/request-change-password';

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
    RequestChangePasswordComponent
  ],
  providers: [
    FormBuilder,
    UserService
  ]
})
export class UserModule {}
