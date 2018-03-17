import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './routing.module';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    AdminRoutingModule
  ],
  declarations: [
  ],
  providers: [
  ]
})
export class AdminModule {}
