import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { LibraryRoutingModule } from './routing.module';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    LibraryRoutingModule
  ],
  declarations: [

  ]
})
export class LibraryModule {}
