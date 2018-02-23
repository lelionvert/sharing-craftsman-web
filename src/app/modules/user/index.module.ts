import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';

import { LoginComponent } from './components/login/login.component';

import { UserRoutingModule } from './routing.module';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    FormBuilder
  ]
})
export class UserModule {}
