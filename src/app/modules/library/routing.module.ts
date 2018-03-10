import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryComponent } from './components/library/library.component';
import { LibraryCreationComponent } from './components/library-creation/library-creation.component';

const libraryRoutes: Routes = [
  {
    path: 'library',
    component: LibraryComponent
  },
  {
    path: 'library/add',
    component: LibraryCreationComponent
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
