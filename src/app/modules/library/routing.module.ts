import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const libraryRoutes: Routes = [
  
];

@NgModule({
  imports: [
    RouterModule.forChild(libraryRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class LibraryRoutingModule { }
