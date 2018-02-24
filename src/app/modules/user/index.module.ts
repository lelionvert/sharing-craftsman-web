import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';

import { LoginComponent } from './components/login/login.component';

import { UserRoutingModule } from './routing.module';
import { UserService } from './services/user.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    FormBuilder,
    UserService
  ]
})
export class UserModule {}
