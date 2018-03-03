import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryComponent } from './components/library/library.component';

const libraryRoutes: Routes = [
  {
    path: 'library',
    component: LibraryComponent
  }
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
